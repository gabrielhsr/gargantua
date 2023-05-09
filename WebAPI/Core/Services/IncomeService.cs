using Financial.Core.Extensions;
using Financial.Core.Helpers;
using Financial.Core.Services.Base;
using Financial.Domain.DTO;
using Financial.Domain.Interfaces.Services;
using Financial.Domain.Interfaces.Services.Base;
using Financial.Domain.Models;

namespace Financial.Core.Services
{
    public class IncomeService : BaseService<Income>, IIncomeService
    {
        public IncomeService(IDependencyAggregate<Income> aggregate) : base(aggregate) { }

        public override async Task<Income> SaveAsync(Guid id, Income entity)
        {
            entity.User = await repository.Context.User.FindAsync(UserId);

            if (entity.Periodic) entity.Installments = 1;

            return await base.SaveAsync(id, entity);
        }

        public override async Task RemoveAsync(Guid id)
        {
            var income = await GetByIdAsync(id);

            if (income.RecurrentId is not null)
            {
                await base.RemoveAsync((Guid)income.RecurrentId);
            }

            await base.RemoveAsync(id);
        }

        public IList<Period> GetPeriods()
        {
            var periods = base.GetAll()
                .Where(income => income.User.Id == UserId)
                .OrderBy(x => x.PaymentDate)
                .Select(x => new Period { Month = x.PaymentDate.Month, Year = x.PaymentDate.Year })
                .Distinct()
                .ToList();

            return periods;
        }

        public IList<Income> GetIncomeByPeriod(Period period)
        {
            return base.GetAll()
                .Where(income => income.User.Id == UserId) // Filter by logged used
                .CalculateInstallment(period)
                .FilterByPeriod(period)
                .CalculateDate(period)
                .OrderBy(income => income.PaymentDate) // Order by payment date
                .ToList();
        }
    }
}
