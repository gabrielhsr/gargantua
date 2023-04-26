using Financial.Core.Helpers;
using Financial.Core.Services.Base;
using Financial.Domain.DTO;
using Financial.Domain.Interfaces.Services;
using Financial.Domain.Interfaces.Services.Base;
using Financial.Domain.Models;

namespace Financial.Core.Services
{
    public class IncomeService : BaseService<Income>, IIncomeService
    {
        public IncomeService(IDependencyAggregate<Income> aggregate) : base(aggregate) { }

        public override async Task<Income> SaveAsync(Guid id, Income entity)
        {
            entity.User = await repository.Context.User.FindAsync(UserId);

            if (entity.Periodic) entity.Installments = 1;

            return await base.SaveAsync(id, entity);
        }

        public override async Task RemoveAsync(Guid id)
        {
            var income = await GetByIdAsync(id);

            if (income.RecurrentId is not null)
            {
                await base.RemoveAsync((Guid)income.RecurrentId);
            }

            await base.RemoveAsync(id);
        }

        public async Task<IList<Period>> GetPeriods()
        {
            var income = await base.GetAllAsync();

            var periods = income
                .Where(income => income.User.Id == UserId)
                .OrderBy(x => x.PaymentDate)
                .Select(x => new Period { Month = x.PaymentDate.Month, Year = x.PaymentDate.Year })
                .Distinct()
                .ToList();

            return periods;
        }

        public async Task<IList<Income>> GetIncomeByPeriod(Period period)
        {
            var allIncome = await base.GetAllAsync();

            var incomeByPeriod = allIncome
                .Where(income => income.User.Id == UserId) // Filter by logged used
                .Select(income =>
                {
                    // Calculate installment based on selected period and changes description. Ex: Car Fix (2/10)
                    var lastCharge = income.PaymentDate.AddMonths(income.Installments - 1);
                    income.DisplayDescription = income.Description;

                    if (DateHelper.InTimeRange(period, income.PaymentDate, lastCharge) && income.Installments > 1)
                    {
                        var currentCharge = lastCharge.Month - period.Month + 12 * (lastCharge.Year - period.Year);

                        income.DisplayDescription += $" ({income.Installments - currentCharge}/{income.Installments})";
                    }

                    return income;
                })
                .Where(income => income.Periodic || period.Equals(income.PaymentDate) || (income.Installments > 1 && period.EqualOrGreater(income.PaymentDate))) // Filter if it's periodic OR is the selected period OR have more than one installment and is the selected period or greater
                .Where(income => !allIncome.Any(any => any.RecurrentId == income.Id && period.Equals(any.PaymentDate))) // Filter to check if a Income is part of a periodic income and has been solo edited
                .Select(income =>
                {
                    // Calculate the date based on selected period
                    if (income.Periodic || income.Installments > 1)
                    {
                        var yearDiff = period.Year - income.PaymentDate.Year;
                        var monthDiff = period.Month - income.PaymentDate.Month;

                        income.PaymentDate = income.PaymentDate.AddMonths(monthDiff).AddYears(yearDiff);
                    };

                    return income;
                })
                .OrderBy(income => income.PaymentDate) // Order by payment date
                .ToList();

            return incomeByPeriod;
        }
    }
}
