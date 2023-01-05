using Financial.Data.DTO;
using Financial.Data.Models;
using Financial.Interfaces.Repositories;
using Financial.Interfaces.Services;

namespace Financial.Services
{
    public class PeriodService : IPeriodService
    {
        private readonly IExpenseService expenseService;
        private readonly IRevenueService revenueService;

        public PeriodService(IExpenseService expenseService, IRevenueService revenueService)
        {
            this.expenseService = expenseService;
            this.revenueService = revenueService;
        }

        public async Task<IList<Period>> GetPeriods()
        {
            var revenuePeriods = await revenueService.GetPeriods();
            var expensePeriods = await expenseService.GetPeriods();

            var periods = revenuePeriods
                .Concat(expensePeriods)
                .OrderBy(x => new DateTime(x.Year, x.Month, 1))
                .Distinct()
                .ToList();

            return periods;
        }
    }
}
