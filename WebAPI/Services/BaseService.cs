using Financial.Data.Models;
using Financial.Helpers;
using Financial.Interfaces.Repositories;
using Financial.Interfaces.Services;

namespace Financial.Services
{
    public class BaseService<T> : IBaseService<T> where T : BaseEntity
    {
        private readonly IBaseRepository<T> baseRepository;

        public BaseService(IBaseRepository<T> baseRepository)
        {
            this.baseRepository = baseRepository;
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
