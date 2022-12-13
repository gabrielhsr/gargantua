using Microsoft.AspNetCore.Mvc;
using Financial.Interfaces;
using Financial.Data.Models;
using AutoMapper;

namespace Financial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController<TEntity, TDto> : ControllerBase where TEntity : BaseEntity
    {
        private readonly IBaseRepository<TEntity> repository;
        private readonly IMapper mapper;

        public BaseController(IBaseRepository<TEntity> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        // GET: api/Entity
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TEntity>>> GetEntities()
        {
            var entity = await repository.GetAllAsync();

            return Ok(entity);
        }

        // GET: api/Entity/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TEntity>> GetEntity(Guid id)
        {
            var entity = await repository.GetAsync(id);

            if (entity == null)
            {
                return NotFound();
            }

            var dto = mapper.Map<TEntity, TDto>(entity);

            return Ok(dto);
        }

        // PUT: api/Entity/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEntity(Guid id, TEntity entity)
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
        public async Task<ActionResult<TEntity>> PostEntity(Guid id, TEntity entitiy)
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
