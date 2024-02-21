﻿using Financial.v1.Core.Extensions;
using Financial.v1.Domain.DTO;
using Financial.v1.Domain.Interfaces.Services;
using Financial.v1.Domain.Models;
using Financial.v2.Core.Services.Base;
using Financial.v2.Domain.Interfaces.Services.Base;
using Financial.v2.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Financial.v1.Core.Services
{
    public class ExpenseService : BaseService<Expense>, IExpenseService
    {
        public ExpenseService(IDependencyAggregate<Expense> aggregate) : base(aggregate) { }

        public override async Task<Expense> SaveAsync(Guid id, Expense entity)
        {
            if (entity.Category.Id != Guid.Empty) repository.Context.Entry(entity.Category).State = EntityState.Unchanged;
            if (entity.PaymentMethod.Id != Guid.Empty) repository.Context.Entry(entity.PaymentMethod).State = EntityState.Unchanged;

            if (entity.Periodic) entity.Installments = 1;

            entity.User = await repository.Context.Set<User>().FindAsync(UserId);

            return await base.SaveAsync(id, entity);
        }

        public override async Task<Expense> RemoveAsync(Guid id)
        {
            var expense = await GetByIdAsync(id);
            var mainId = expense.RecurrentId is not null ? (Guid)expense.RecurrentId : id;

            var recurrentMonthEdit = GetAll().Where(monthEdit => monthEdit.RecurrentId == mainId);

            foreach (var monthEdit in recurrentMonthEdit)
            {
                await base.RemoveAsync(monthEdit.Id);
            }

            return await base.RemoveAsync(mainId);
        }

        public IList<Period> GetPeriods()
        {
            var periods = base.GetAll()
                .Where(expense => expense.User.Id == UserId)
                .OrderBy(x => x.DueDate)
                .Select(x => new Period { Month = x.DueDate.Month, Year = x.DueDate.Year })
                .Distinct()
                .ToList();

            return periods;
        }

        public IList<Expense> GetExpensesByPeriod(Period period)
        {
            return base.GetAll()
                .Where(expense => expense.User.Id == UserId) // Filter by logged used
                .CalculateInstallment(period)
                .FilterByPeriod(period)
                .CalculateDate(period)
                .OrderBy(expense => expense.DisplayDueDate) // Order by due date
                .ToList();
        }

        public async Task MarkAsPaid(IList<ExpensePaid> expenses)
        {
            foreach (var expense in expenses)
            {
                var storedExpense = await GetByIdAsync(expense.Id);

                storedExpense.Paid = expense.Paid;
            }

            await repository.Context.SaveChangesAsync();
        }
    }
}
