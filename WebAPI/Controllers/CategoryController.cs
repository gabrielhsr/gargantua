using Financial.Controllers.Base;
using Financial.Domain.Interfaces.Services.Base;
using Financial.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace Financial.Controllers
{
    [ApiController]
    public class CategoryController : BaseController<Category>
    {
        public CategoryController(IBaseService<Category> service) : base(service)
        {
        }
    }
}
