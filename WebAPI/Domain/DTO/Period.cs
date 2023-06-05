using System.Globalization;

namespace Financial.Domain.DTO
{
    public class Period : IEquatable<Period>
    {
        public int Month { get; set; }
        public int Year { get; set; }
        public DateTimeOffset ToDateTimeOffset() => DateTimeOffset.ParseExact($"01/{Month:00}/{Year}", "dd/MM/yyyy", new CultureInfo("pt-BR"), DateTimeStyles.None);
        public bool Equals(Period other) => Month == other.Month && Year == other.Year;
        public bool Equals(DateTimeOffset other) => Month == other.Month && Year == other.Year;
        public override int GetHashCode() => Month.GetHashCode() ^ Year.GetHashCode();
        public override bool Equals(object obj) => obj is Period objPeriod && Equals(objPeriod) || obj is DateTimeOffset objDate && Equals(objDate);
        public bool InRange(DateTimeOffset start, DateTimeOffset end) => this.ToDateTimeOffset() >= start && this.ToDateTimeOffset() < end;
        public bool InRange(DateTimeOffset? start, DateTimeOffset? end) => this.ToDateTimeOffset() >= start && this.ToDateTimeOffset() < end;
    }
}


