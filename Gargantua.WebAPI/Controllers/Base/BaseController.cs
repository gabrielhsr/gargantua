using Gargantua.Domain.Entities;
using Gargantua.Domain.Interfaces.Services.Base;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace Financial.Controllers.Base
{
    ////[Authorize]
    [ApiController]
    public class BaseController<TEntity> : ODataController where TEntity : BaseEntity
    {
        private readonly IBaseService<TEntity> service;

        public BaseController(IBaseService<TEntity> service)
        {
            this.service = service;
        }

        // GET: api/Entity
        [HttpGet]
        [EnableQuery]
        public virtual IQueryable<TEntity> Get()
        {
            return service.GetAll();
        }

        // GET: api/Entity/5
        [HttpGet("{id}")]
        public virtual async Task<ActionResult<TEntity>> GetEntity(Guid id)
        {
            var entity = await service.GetByIdAsync(id);

            if (entity == null)
            {
                return NotFound();
            }

            return Ok(entity);
        }

        // PUT: api/Entity/5
        [HttpPut("{id}")]
        public virtual async Task<IActionResult> Put(Guid id, TEntity entity)
        {
            var result = await service.SaveAsync(id, entity);

            if (result is not null)
            {
                return Ok(result);
            }

            return BadRequest();
        }

        // POST: api/Entity
        [HttpPost]
        public virtual async Task<ActionResult<TEntity>> Post(TEntity entitiy)
        {
            var newEntitiy = await service.SaveAsync(Guid.Empty, entitiy);

            return Ok(newEntitiy);
        }

        // DELETE: api/Entities/5
        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> Delete(Guid id)
        {
            var entitiy = await service.GetByIdAsync(id);

            if (entitiy == null)
            {
                return NotFound();
            }

            return Ok(await service.RemoveAsync(id));
        }
    }
}
