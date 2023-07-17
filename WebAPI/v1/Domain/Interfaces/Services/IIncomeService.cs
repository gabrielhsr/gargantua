using Financial.v1.Domain.DTO;
using Financial.v1.Domain.Models;
using Financial.v2.Domain.Interfaces.Services.Base;

namespace Financial.v1.Domain.Interfaces.Services
{
    public interface IIncomeService : IBaseService<Income>
    {
        IList<Period> GetPeriods();
        IList<Income> GetIncomeByPeriod(Period period);
    }
}