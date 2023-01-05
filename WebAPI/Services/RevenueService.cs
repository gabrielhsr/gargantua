using Financial.Data.DTO;
using Financial.Data.Models;
using Financial.Interfaces.Repositories;
using Financial.Interfaces.Services;

namespace Financial.Services
{
    public class RevenueService : BaseService<Revenue>, IRevenueService
    {

        public RevenueService(IBaseRepository<Revenue> repository) : base(repository) { }

        public async Task<IList<Period>> GetPeriods()
        {
            var revenue = await base.GetAllAsync();

            var periods = revenue
                .OrderBy(x => x.PaymentDate)
                .Select(x => new Period { Month = x.PaymentDate.Month, Year = x.PaymentDate.Year })
                .Distinct()
                .ToList();

            return periods;
        }

        public async Task<IList<Revenue>> GetRevenueByPeriod(Period period)
        {
            var revenue = await base.GetAllAsync();

            var revenueByPeriod = revenue
                .Where(x => x.PaymentDate.Month == period.Month && x.PaymentDate.Year == period.Year)
                .OrderBy(x => x.PaymentDate)
                .ToList();

            return revenueByPeriod;
        }
    }
}
