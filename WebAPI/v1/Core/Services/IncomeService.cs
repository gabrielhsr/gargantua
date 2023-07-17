using Financial.v1.Core.Extensions;
using Financial.v1.Domain.DTO;
using Financial.v1.Domain.Interfaces.Services;
using Financial.v1.Domain.Models;
using Financial.v2.Core.Services.Base;
using Financial.v2.Domain.Interfaces.Services.Base;

namespace Financial.v1.Core.Services
{
    public class IncomeService : BaseService<Income>, IIncomeService
    {
        public IncomeService(IDependencyAggregate<Income> aggregate) : base(aggregate) { }

        public override async Task<Income> SaveAsync(Guid id, Income entity)
        {
            ////entity.User = await repository.Context.User.FindAsync(UserId);

            if (entity.Periodic) entity.Installments = 1;

            return await base.SaveAsync(id, entity);
        }

        public override async Task RemoveAsync(Guid id)
        {
            var income = await GetByIdAsync(id);
            var mainId = income.RecurrentId is not null ? (Guid)income.RecurrentId : id;

            var recurrentMonthEdit = GetAll().Where(monthEdit => monthEdit.RecurrentId == mainId);

            foreach (var monthEdit in recurrentMonthEdit)
            {
                await base.RemoveAsync(monthEdit.Id);
            }

            await base.RemoveAsync(mainId);
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
                .OrderBy(income => income.DisplayPaymentDate) // Order by payment date
                .ToList();
        }
    }
}
