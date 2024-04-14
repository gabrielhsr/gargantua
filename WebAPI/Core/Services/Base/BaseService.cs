using Financial.Core.Extensions;
using Financial.Domain.Interfaces.Providers;
using Financial.Domain.Interfaces.Repositories.Base;
using Financial.Domain.Interfaces.Services.Base;
using Financial.Domain.Models.Base;

namespace Financial.Core.Services.Base
{
    public class BaseService<T> : IBaseService<T> where T : BaseEntity
    {
        private readonly IUserProvider userProvider;

        public readonly IBaseRepository<T> repository;

        public Guid IdUser
        {
            get
            {
                return userProvider.GetIdUser();
            }
            private set { }
        }

        public BaseService(IDependencyAggregate<T> dependencyAggregate)
        {
            repository = dependencyAggregate.BaseRepository;
            userProvider = dependencyAggregate.UserProvider;
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
