using Financial.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Financial.Core.Mapping
{
    public class CategoryClassMap : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.ToTable("Category");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .IsRequired(true);

            builder.Property(x => x.Name)
                .HasColumnName("Name")
                .HasMaxLength(50)
                .IsRequired(true);

            builder.HasMany(x => x.Expense)
                .WithOne(x => x.Category)
                .HasForeignKey(x => x.IdCategory)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired(true);
        }
    }
}
