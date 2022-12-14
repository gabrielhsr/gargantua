using Financial.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Financial.Data
{
    public class FinancialDbContext: DbContext
    {
        public FinancialDbContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<PaymentMethod> PaymentMethods { get; set; }
    }
}