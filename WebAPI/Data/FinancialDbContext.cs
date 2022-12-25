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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Expense>()
                .HasOne(x => x.Category)
                .WithMany(x => x.Expenses)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Expense>()
                .HasOne(x => x.PaymentMethod)
                .WithMany(x => x.Expenses)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Category>()
                .Ignore(x => x.Expenses);

            modelBuilder.Entity<PaymentMethod>()
                .Ignore(x => x.Expenses);

            base.OnModelCreating(modelBuilder);
        }
    }
}