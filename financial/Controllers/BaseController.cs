using Microsoft.AspNetCore.Mvc;
using Financial.Interfaces;
using Financial.Data.Models;

namespace Financial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController<T> : ControllerBase where T : BaseEntity
    {
        private readonly IBaseRepository<T> repository;

        public BaseController(IBaseRepository<T> repository)
        {
            this.repository = repository;
        }

        // GET: api/Entity
        [HttpGet]
        public async Task<ActionResult<IEnumerable<T>>> GetEntities()
        {
            var entity = await repository.GetAllAsync();

            return Ok(entity);
        }

        // GET: api/Entity/5
        [HttpGet("{id}")]
        public async Task<ActionResult<T>> GetEntity(Guid id)
        {
            var entitiy = await repository.GetAsync(id);

            if (entitiy == null)
            {
                return NotFound();
            }

            return Ok(entitiy);
        }

        // PUT: api/Entity/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEntity(Guid id, T entity)
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
        public async Task<ActionResult<T>> PostEntity(Guid id, T entitiy)
        {
            var newEntitiy = await repository.SaveAsync(id, entitiy);

            return Ok(newEntitiy);
        }

        // DELETE: api/Entities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEntity(Guid id)
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
