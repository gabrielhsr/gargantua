using Financial.Domain.Mapping;
using Financial.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Financial.Domain.Data
{
    public class FinancialDbContext : DbContext
    {
        public FinancialDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<PaymentMethod> PaymentMethods { get; set; }
        public DbSet<Income> Income { get; set; }
        public DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ExpenseMap());
            modelBuilder.ApplyConfiguration(new IncomeMap());

            base.OnModelCreating(modelBuilder);
        }
    }
}