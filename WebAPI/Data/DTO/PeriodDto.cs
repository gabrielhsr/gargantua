namespace Financial.Data.DTO
{
    public class PeriodDto: IEquatable<PeriodDto>
    {
        public int Month { get; set; }
        public int Year { get; set; }

        public bool Equals(PeriodDto? other) => Month == other?.Month && Year == other?.Year;
        public override int GetHashCode() => Month.GetHashCode() ^ Year.GetHashCode();
    }
}
