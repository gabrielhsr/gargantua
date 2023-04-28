using Financial.Core.Extensions;
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
                .CalculateInstallment(period)
                .FilterByPeriod(period)
                .Where(income =>
                {
                    // Filter if the selected period matches a income interval
                    var monthDifference = period.Month - income.PaymentDate.Month + 12 * (period.Year - income.PaymentDate.Year);

                    return monthDifference == 0 || monthDifference % income.MonthInterval == 0;
                })
                .CalculateDate(period)
                .OrderBy(income => income.PaymentDate) // Order by payment date
                .ToList();

            return incomeByPeriod;
        }
    }
}
