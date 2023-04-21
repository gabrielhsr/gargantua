using Financial.Domain.DTO;
using Financial.Domain.Interfaces.Services.Base;
using Financial.Domain.Models;

namespace Financial.Domain.Interfaces.Services
{
    public interface IIncomeService : IBaseService<Income>
    {
        Task<IList<Period>> GetPeriods();
        Task<IList<Income>> GetIncomeByPeriod(Period period);
    }
}