using Financial.Data.DTO;
using Financial.Data.Models;
using Financial.Helpers;
using Financial.Interfaces.Repositories;
using Financial.Interfaces.Services;

namespace Financial.Services
{
    public class IncomeService : BaseService<Income>, IIncomeService
    {

        public IncomeService(IBaseRepository<Income> repository) : base(repository) { }

        public async Task<IList<Period>> GetPeriods()
        {
            var income = await base.GetAllAsync();

            var periods = income
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
                .Where(income => income.Periodic || PeriodHelper.Compare(income.PaymentDate, period))
                .Where(income => !income.Periodic || !allIncome.Any(any => any.RecurrentId == income.Id && PeriodHelper.Compare(any.PaymentDate, period)))
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
