using Financial.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Financial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesController : BaseController<Expense>
    {
        public ExpensesController(IBaseRepository<Expense> repository) : base(repository)
        {
        }
    }
}
