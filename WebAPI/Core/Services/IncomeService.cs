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
            entity.User = await dbContext.Set<User>().FindAsync(UserId);

            return await base.SaveAsync(id, entity);
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
                .Where(income => income.User.Id == UserId)
                .Where(income => income.Periodic || period.Equals(income.PaymentDate))
                .Where(income => !income.Periodic || !allIncome.Any(any => any.RecurrentId == income.Id && period.Equals(any.PaymentDate)))
                .Select(income =>
                {
                    if (income.Periodic)
                    {
                        var yearDiff = period.Year - income.PaymentDate.Year;
                        var monthDiff = period.Month - income.PaymentDate.Month;

                        income.PaymentDate = income.PaymentDate.AddMonths(monthDiff).AddYears(yearDiff);
                    };

                    return income;
                })
                .OrderBy(income => income.PaymentDate)
                .ToList();

            return incomeByPeriod;
        }
    }
}
