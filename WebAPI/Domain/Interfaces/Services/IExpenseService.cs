using Financial.Domain.DTO;
using Financial.Domain.Models;
using Financial.Domain.Interfaces.Services.Base;

namespace Financial.Domain.Interfaces.Services
{
    public interface IExpenseService: IBaseService<Expense>
    {
        IList<Period> GetPeriods();
        IList<Expense> GetExpensesByPeriod(Period period);
        Task MarkAsPaid(IList<ExpensePaid> expenses);
    }
}