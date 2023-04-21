using Financial.Domain.DTO;

namespace Financial.Domain.Interfaces.Services
{
    public interface IPeriodService
    {
        Task<IList<Period>> GetPeriods();
    }
}