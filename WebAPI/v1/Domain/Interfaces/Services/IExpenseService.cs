using Financial.v1.Domain.DTO;
using Financial.v1.Domain.Models;
using Financial.v2.Domain.Interfaces.Services.Base;

namespace Financial.v1.Domain.Interfaces.Services
{
    public interface IExpenseService : IBaseService<Expense>
    {
        IList<Period> GetPeriods();
        IList<Expense> GetExpensesByPeriod(Period period);
        Task MarkAsPaid(IList<ExpensePaid> expenses);
    }
}