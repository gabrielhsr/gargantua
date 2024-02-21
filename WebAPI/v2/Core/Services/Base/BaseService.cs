using Financial.v2.Core.Helpers;
using Financial.v2.Domain.Interfaces.Repositories.Base;
using Financial.v2.Domain.Interfaces.Services.Base;
using Financial.v2.Domain.Models.Base;

namespace Financial.v2.Core.Services.Base
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

        public virtual async Task<T> RemoveAsync(Guid id)
        {
            return await repository.DeleteAsync(id);
        }

        public virtual IQueryable<T> GetAll()
        {
            return repository.GetAll();
        }

        public virtual async Task<T> GetByIdAsync(Guid id)
        {
            return await repository.GetByIdAsync(id);
        }

        public virtual async Task<T> SaveAsync(Guid id, T entity)
        {
            if (id.IsNullOrDefault())
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
