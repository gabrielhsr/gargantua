using Financial.Data.DTO;

namespace Financial.Interfaces.Services
{
    public interface IPeriodService
    {
        Task<IList<Period>> GetPeriods();
    }
}