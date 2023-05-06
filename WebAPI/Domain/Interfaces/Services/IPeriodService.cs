using Financial.Domain.DTO;

namespace Financial.Domain.Interfaces.Services
{
    public interface IPeriodService
    {
        IList<Period> GetPeriods();
    }
}