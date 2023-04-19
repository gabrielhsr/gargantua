using Financial.Data.DTO;
using Financial.Data.Models;
using Financial.Interfaces.Services.Base;

namespace Financial.Interfaces.Services
{
    public interface IIncomeService : IBaseService<Income>
    {
        Task<IList<Period>> GetPeriods();
        Task<IList<Income>> GetIncomeByPeriod(Period period);
    }
}