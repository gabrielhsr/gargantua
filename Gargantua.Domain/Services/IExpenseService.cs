using Gargantua.Domain.Entities;
using Gargantua.Domain.Interfaces.Services.Base;

namespace Gargantua.Domain.Interfaces.Services
{
    public interface IExpenseService : IBaseService<Expense, Guid>
    {
    }
}
