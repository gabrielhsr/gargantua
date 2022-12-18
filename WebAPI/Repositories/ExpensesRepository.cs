using Financial.Data;
using Financial.Data.Models;
using Financial.Interfaces;

namespace Financial.Repositories
{
    public class ExpensesRepository : BaseRepository<Expense>, IExpensesRepository
    {
        public ExpensesRepository(FinancialDbContext context) : base(context)
        {
        }
    }
}
  