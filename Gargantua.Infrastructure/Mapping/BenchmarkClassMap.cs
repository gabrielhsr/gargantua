using Gargantua.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Gargantua.Infrastructure.Mapping
{
    public class BenchmarkClassMap : IEntityTypeConfiguration<Benchmark>
    {
        public void Configure(EntityTypeBuilder<Benchmark> builder)
        {
            builder.ToTable("Benchmark");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .IsRequired(true);

            builder.Property(x => x.Excluded)
                .HasColumnName("Excluded")
                .IsRequired(true);

            builder.Property(x => x.DateTimeUtc)
                .HasColumnName("DateTimeUtc")
                .IsRequired(true);

            builder.Property(x => x.Session)
                .HasColumnName("Session")
                .HasMaxLength(200)
                .IsRequired(true);

            builder.Property(x => x.Scenario)
                .HasColumnName("Scenario")
                .HasMaxLength(200)
                .IsRequired(true);

            builder.Property(x => x.Description)
                .HasColumnName("Description")
                .HasMaxLength(200)
                .IsRequired(true);

            builder.Property(x => x.Document)
                .HasColumnName("Document")
                .IsRequired(true);
        }
    }
}
