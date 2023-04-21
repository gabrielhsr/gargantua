using Financial.Domain.DTO;

namespace Financial.Core.Helpers
{
    public static class DateHelper
    {
        public static bool InTimeRange(DateTimeOffset DateToCheck, DateTimeOffset LowerBound, DateTimeOffset UpperBound)
        {
            return (DateToCheck.Year == LowerBound.Year && DateToCheck.Month >= LowerBound.Month || DateToCheck.Year > LowerBound.Year)
                    && (DateToCheck.Year == UpperBound.Year && DateToCheck.Month <= UpperBound.Month || DateToCheck.Year < UpperBound.Year);
        }

        public static bool InTimeRange(Period DateToCheck, DateTimeOffset LowerBound, DateTimeOffset UpperBound)
        {
            return (DateToCheck.Year == LowerBound.Year && DateToCheck.Month >= LowerBound.Month || DateToCheck.Year > LowerBound.Year)
                    && (DateToCheck.Year == UpperBound.Year && DateToCheck.Month <= UpperBound.Month || DateToCheck.Year < UpperBound.Year);
        }
    }
}
