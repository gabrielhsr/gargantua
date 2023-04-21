namespace Financial.Domain.DTO
{
    public class Period : IEquatable<Period>
    {
        public int Month { get; set; }
        public int Year { get; set; }

        public DateTimeOffset ToDateTimeOffset()
        {
            return DateTimeOffset.Parse($"1/{Month}/{Year}");
        }
        public bool Equals(Period other) => Month == other.Month && Year == other.Year;
        public bool Equals(DateTimeOffset other) => Month == other.Month && Year == other.Year;
        public override int GetHashCode() => Month.GetHashCode() ^ Year.GetHashCode();
        public override bool Equals(object obj) => obj is Period objPeriod && Equals(objPeriod) || obj is DateTimeOffset objDate && Equals(objDate);

    }
}


