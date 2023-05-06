﻿using Financial.Domain.DTO;
using Financial.Domain.Interfaces.Services;

namespace Financial.Core.Services
{
    public class PeriodService : IPeriodService
    {
        private readonly IExpenseService expenseService;
        private readonly IIncomeService incomeService;

        public PeriodService(IExpenseService expenseService, IIncomeService incomeService)
        {
            this.expenseService = expenseService;
            this.incomeService = incomeService;
        }

        public IList<Period> GetPeriods()
        {
            var incomePeriods = incomeService.GetPeriods();
            var expensePeriods = expenseService.GetPeriods();

            var periods = incomePeriods
                .Concat(expensePeriods)
                .OrderBy(x => new DateTime(x.Year, x.Month, 1))
                .Distinct()
                .ToList();

            return periods;
        }
    }
}
