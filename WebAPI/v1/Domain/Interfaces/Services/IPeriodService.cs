using Financial.v1.Domain.DTO;

namespace Financial.v1.Domain.Interfaces.Services
{
    public interface IPeriodService
    {
        IList<Period> GetPeriods();
    }
}