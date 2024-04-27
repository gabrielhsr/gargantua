using Gargantua.Domain.Entities;
using Gargantua.Domain.Interfaces.Services.Base;
using Microsoft.AspNetCore.Mvc;

namespace Gargantua.Controllers
{
    [Route("api/[controller]")]
    public class CategoryController : BaseController<Category>
    {
        public CategoryController(IBaseService<Category> service) : base(service)
        {
        }
    }
}
