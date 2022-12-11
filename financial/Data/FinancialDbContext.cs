using Financial.Data.Models.Expense;
using Microsoft.EntityFrameworkCore;

namespace Financial.Data
{
    public class FinancialDbContext: DbContext
    {
        public FinancialDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Expense> Expenses { get; set; }
    }
}