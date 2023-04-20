using Financial.Data.DTO;
using Financial.Data.Models;
using Financial.Interfaces.Services.Base;

namespace Financial.Interfaces.Services
{
    public interface IExpenseService: IBaseService<Expense>
    {
        Task<IList<Period>> GetPeriods();
        Task<IList<Expense>> GetExpensesByPeriod(Period period);
        Task MarkAsPaid(IList<Guid> ids);
    }
}