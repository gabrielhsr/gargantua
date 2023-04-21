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
        private readonly IHttpContextAccessor httpContextAccessor;

        public readonly IBaseRepository<T> repository;

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
            repository = dependencyAggregate.BaseRepository;
            httpContextAccessor = dependencyAggregate.HttpContextAccessor;
        }

        public virtual async Task RemoveAsync(Guid id)
        {
            await repository.DeleteAsync(id);
        }

        public virtual async Task<IList<T>> GetAllAsync()
        {
            return await repository.GetAllAsync();
        }

        public virtual async Task<T> GetAsync(Guid id)
        {
            return await repository.GetAsync(id);
        }

        public virtual async Task<T> SaveAsync(Guid id, T entity)
        {
            if (IdHelper.IsNullOrDefault(id))
            {
                await repository.AddAsync(entity);
            }
            else
            {
                if (await repository.Exists(id))
                {
                    entity.Id = id;

                    await repository.UpdateAsync(entity);
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
