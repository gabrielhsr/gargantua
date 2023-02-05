using Financial.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Financial.Interfaces.Services;
using Financial.Data.DTO;

namespace Financial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : BaseController<Category>
    {
        public CategoryController(IBaseService<Category> service) : base(service)
        {
        }

        [HttpGet("test")]
        public async Task<IActionResult> Teste()
        {
            return Ok("Teste 2");
        }
    }
}
