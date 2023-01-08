using Financial.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Financial.Interfaces.Services;

namespace Financial.Controllers
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
