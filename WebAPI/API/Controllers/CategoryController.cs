using Microsoft.AspNetCore.Mvc;
using Financial.Domain.Models;
using Financial.Domain.Interfaces.Services.Base;

namespace Financial.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : BaseController<Category>
    {
        public CategoryController(IBaseService<Category> service) : base(service)
        {
        }
    }
}
