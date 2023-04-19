using Financial.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Financial.Data.DTO;
using Financial.Interfaces.Services.Base;

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
