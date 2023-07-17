using Financial.v1.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Financial.v1.Domain.Mapping
{
    public class IncomeMap : IEntityTypeConfiguration<Income>
    {
        public void Configure(EntityTypeBuilder<Income> builder)
        {
            //builder.HasOne(x => x.User)
            //    .WithMany(x => x.Incomes)
            //    .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
