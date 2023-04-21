using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Financial.Domain.Models;
using Financial.Domain.Interfaces.Services.Base;

namespace Financial.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BaseController<TEntity> : ControllerBase where TEntity : BaseEntity
    {
        private readonly IBaseService<TEntity> service;

        public BaseController(IBaseService<TEntity> service)
        {
            this.service = service;
        }

        // GET: api/Entity
        [HttpGet]
        public virtual async Task<ActionResult<IEnumerable<TEntity>>> GetEntities()
        {
            var records = await service.GetAllAsync();

            return Ok(records);
        }

        // GET: api/Entity/5
        [HttpGet("{id}")]
        public virtual async Task<ActionResult<TEntity>> GetEntity(Guid id)
        {
            var entity = await service.GetAsync(id);

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
            var result = await service.SaveAsync(id, entity);

            if (result is not null)
            {
                return Ok(result);
            }

            return BadRequest();
        }

        // POST: api/Entity
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public virtual async Task<ActionResult<TEntity>> PostEntity(TEntity entitiy)
        {
            var newEntitiy = await service.SaveAsync(Guid.Empty, entitiy);

            return Ok(newEntitiy);
        }

        // DELETE: api/Entities/5
        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> DeleteEntity(Guid id)
        {
            var entitiy = await service.GetAsync(id);

            if (entitiy == null)
            {
                return NotFound();
            }

            await service.RemoveAsync(id);

            return NoContent();
        }
    }
}
