using Financial.Data.DTO;

namespace Financial.Helpers
{
    public static class PeriodHelper
    {
        public static bool Compare(DateTimeOffset date, Period period)
        {
            return date.Month == period.Month && date.Year == period.Year;
        }
    }
}
