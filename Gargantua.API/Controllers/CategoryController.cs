using Gargantua.Domain.Entities;
using Gargantua.Domain.Interfaces.Services.Base;
using Microsoft.AspNetCore.Mvc;

namespace Gargantua.Controllers
{
    [Route("api/[controller]")]
    public class CategoryController : BaseController<Category, Guid>
    {
        public CategoryController(IBaseService<Category, Guid> service) : base(service)
        {
        }

        public override IQueryable<Category> Get()
        {
            var random = new Random();

            Task.Delay(TimeSpan.FromSeconds(2)).Wait();

            return base.Get();
        }
    }
}
