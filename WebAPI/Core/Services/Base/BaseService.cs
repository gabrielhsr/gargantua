using Financial.Core.Helpers;
using Financial.Domain.Data;
using Financial.Domain.Interfaces.Repositories;
using Financial.Domain.Interfaces.Services.Base;
using Financial.Domain.Models;
using System.Security.Claims;

namespace Financial.Core.Services.Base
{
    public class BaseService<T> : IBaseService<T> where T : BaseEntity
    {
        private readonly IBaseRepository<T> baseRepository;
        private readonly IHttpContextAccessor httpContextAccessor;

        public readonly FinancialDbContext dbContext;

        public Guid UserId
        {
            get
            {
                return Guid.Parse(httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(x => x.Type == "Id").Value);
            }
            private set { }
        }

        public BaseService(IDependencyAggregate<T> dependencyAggregate)
        {
            baseRepository = dependencyAggregate.BaseRepository;
            httpContextAccessor = dependencyAggregate.HttpContextAccessor;
            dbContext = dependencyAggregate.DbContext;
        }

        public virtual async Task RemoveAsync(Guid id)
        {
            await baseRepository.DeleteAsync(id);
        }

        public virtual async Task<IList<T>> GetAllAsync()
        {
            return await baseRepository.GetAllAsync();
        }

        public virtual async Task<T> GetAsync(Guid id)
        {
            return await baseRepository.GetAsync(id);
        }

        public virtual async Task<T> SaveAsync(Guid id, T entity)
        {
            if (IdHelper.IsNullOrDefault(id))
            {
                await baseRepository.AddAsync(entity);
            }
            else
            {
                if (await baseRepository.Exists(id))
                {
                    entity.Id = id;

                    await baseRepository.UpdateAsync(entity);
                }
                else
                {
                    throw new Exception("Id not found!");
                }
            }

            return entity;
        }
    }
}
