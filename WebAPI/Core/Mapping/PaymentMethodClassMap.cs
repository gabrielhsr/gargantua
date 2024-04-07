using Financial.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Financial.Core.Mapping
{
    public class PaymentMethodClassMap : IEntityTypeConfiguration<PaymentMethod>
    {
        public void Configure(EntityTypeBuilder<PaymentMethod> builder)
        {
            builder.ToTable("PaymentMethod");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .IsRequired(true);

            builder.Property(x => x.Name)
                .HasColumnName("Name")
                .HasMaxLength(50)
                .IsRequired(true);

            //builder.HasMany(x => x.Expense)
            //    .WithOne(x => x.PaymentMethod)
            //    .HasForeignKey(x => x.IdPaymentMethod)
            //    .OnDelete(DeleteBehavior.Restrict)
            //    .IsRequired(true);
        }
    }
}
