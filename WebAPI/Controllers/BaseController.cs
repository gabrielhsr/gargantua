using Microsoft.AspNetCore.Mvc;
using Financial.Interfaces;
using Financial.Data.Models;

namespace Financial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController<TEntity> : ControllerBase where TEntity : BaseEntity
    {
        private readonly IBaseRepository<TEntity> repository;

        public BaseController(IBaseRepository<TEntity> repository)
        {
            this.repository = repository;
        }

        // GET: api/Entity
        [HttpGet]
        public virtual async Task<ActionResult<IEnumerable<TEntity>>> GetEntities()
        {
            var records = await repository.GetAllAsync();

            return Ok(records);
        }

        // GET: api/Entity/5
        [HttpGet("{id}")]
        public virtual async Task<ActionResult<TEntity>> GetEntity(Guid id)
        {
            var entity = await repository.GetAsync(id);

            if (entity == null)
            {
                return NotFound();
            }

            return Ok(entity);
        }

        // PUT: api/Entity/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public virtual async Task<IActionResult> PutEntity(Guid id, TEntity entity)
        {
            var result = await repository.SaveAsync(id, entity);
            
            if (result is not null)
            {
                return Ok(result);
            } 

            return BadRequest();
        }

        // POST: api/Entity
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public virtual async Task<ActionResult<TEntity>> PostEntity(Guid id, TEntity entitiy)
        {
            var newEntitiy = await repository.SaveAsync(id, entitiy);

            return Ok(newEntitiy);
        }

        // DELETE: api/Entities/5
        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> DeleteEntity(Guid id)
        {
            var entitiy = await repository.GetAsync(id);

            if (entitiy == null)
            {
                return NotFound();
            }

            await repository.DeleteAsync(id);

            return NoContent();
        }
    }
}
