using Financial.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Financial.Core.Mapping
{
    public class UserClassMap : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("User");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .IsRequired(true);

            builder.Property(x => x.Email)
                .HasColumnName("Email")
                .HasMaxLength(int.MaxValue)
                .IsRequired(true);

            builder.Property(x => x.PasswordHash)
                .HasColumnName("PasswordHash")
                .IsRequired(true);

            builder.Property(x => x.PasswordSalt)
                .HasColumnName("PasswordSalt")
                .IsRequired(true);

            builder.HasMany(x => x.Expenses)
                .WithOne(x => x.User)
                .HasForeignKey(x => x.IdUser)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired(true);
        }
    }
}
