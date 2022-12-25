using Financial.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Financial.Interfaces.Repositories;

namespace Financial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : BaseController<Category>
    {
        public CategoryController(IBaseRepository<Category> repository) : base(repository)
        {
        }
    }
}
