using Gargantua.Domain.Entities;
using Gargantua.Domain.Extensions;
using Gargantua.Domain.Interfaces.Providers;
using Gargantua.Domain.Interfaces.Repositories;
using Gargantua.Domain.Interfaces.Services;
using Gargantua.Domain.Interfaces.Services.Base;

namespace Gargantua.Service.Services
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
