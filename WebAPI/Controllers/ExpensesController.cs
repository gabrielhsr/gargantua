using Financial.Data.Models;
using Financial.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Financial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesController : BaseController<Expense>
    {
        public ExpensesController(IExpenseService service) : base(service)
        {
        }
    }
}
