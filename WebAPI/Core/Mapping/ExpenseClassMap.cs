using Financial.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Financial.Core.Mapping
{
    public class ExpenseClassMap : IEntityTypeConfiguration<Expense>
    {
        public void Configure(EntityTypeBuilder<Expense> builder)
        {
            builder.ToTable("Expense");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .IsRequired(true);

            builder.Property(x => x.IdCategory)
                .HasColumnName("IdCategory")
                .IsRequired(true);

            builder.Property(x => x.IdPaymentMethod)
                .HasColumnName("IdPaymentMethod")
                .IsRequired(true);

            builder.Property(x => x.IdUser)
                .HasColumnName("IdUser")
                .IsRequired(true);

            builder.Property(x => x.Description)
                .HasColumnName("Description")
                .HasMaxLength(100)
                .IsRequired(true);

            builder.Property(x => x.Amount)
                .HasColumnName("Amount")
                .HasColumnType("money")
                .IsRequired(true);

            builder.Property(x => x.DueDate)
                .HasColumnName("DueDate")
                .IsRequired(false);

            builder.Property(x => x.PurchaseDate)
                .HasColumnName("PurchaseDate")
                .IsRequired(true);

            builder.HasOne(x => x.User)
                .WithMany(x => x.Expenses)
                .HasForeignKey(x => x.IdUser)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired(true);

            builder.HasOne(x => x.Category)
                .WithMany(x => x.Expense)
                .HasForeignKey(x => x.IdCategory)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired(true);

            builder.HasOne(x => x.PaymentMethod)
                .WithMany(x => x.Expense)
                .HasForeignKey(x => x.IdPaymentMethod)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired(true);
        }
    }
}
