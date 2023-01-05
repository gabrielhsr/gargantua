using Financial.Data.Models;

namespace Financial.Data.DTO
{
    public class Period: IEquatable<Period>
    {
        public int Month { get; set; }
        public int Year { get; set; }

        public bool Equals(Period? other) => Month == other?.Month && Year == other?.Year;
        public override int GetHashCode() => Month.GetHashCode() ^ Year.GetHashCode();
    }
}
