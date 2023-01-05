using Financial.Data.DTO;
using Financial.Data.Models;

namespace Financial.Interfaces.Services
{
    public interface IRevenueService : IBaseService<Revenue>
    {
        Task<IList<Period>> GetPeriods();
        Task<IList<Revenue>> GetRevenueByPeriod(Period period);
    }
}