using AutoMapper;
using Financial.Data.Models.Expense;
using Financial.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Financial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : BaseController<Category, CategoryDto>
    {
        public CategoryController(IBaseRepository<Category> repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}
