using Gargantua.Domain.Entities;
using Gargantua.Domain.Interfaces.Repositories;
using Gargantua.Domain.Interfaces.Services;
using Gargantua.Domain.Interfaces.Services.Base;

namespace Gargantua.Service.Services
{
    public class BaseService<TEntity, TID> : IBaseService<TEntity, TID> where TEntity : BaseEntity<TID>
    {
        public readonly IBaseRepository<TEntity, TID> repository;

        public BaseService(IDependencyAggregate<TEntity, TID> dependencyAggregate)
        {
            repository = dependencyAggregate.BaseRepository;
        }

        public virtual async Task<TEntity> RemoveAsync(TID id)
        {
            return await repository.DeleteAsync(id);
        }

        public virtual IQueryable<TEntity> GetAll()
        {
            return repository.GetAll();
        }

        public virtual async Task<TEntity> GetByIdAsync(TID id)
        {
            return await repository.GetByIdAsync(id);
        }

        public virtual async Task<TEntity> SaveAsync(TID id, TEntity entity)
        {
            if (id == null)
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
