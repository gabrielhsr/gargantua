using Financial.Domain.DTO;
using Financial.Domain.Interfaces.Services.Base;
using Financial.Domain.Models;

namespace Financial.Domain.Interfaces.Services
{
    public interface IIncomeService : IBaseService<Income>
    {
        IList<Period> GetPeriods();
        IList<Income> GetIncomeByPeriod(Period period);
    }
}