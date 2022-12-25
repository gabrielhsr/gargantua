using Financial.Interfaces.Repositories;
using Financial.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Financial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesController : BaseController<Expense>
    {
        public ExpensesController(IExpenseRepository repository) : base(repository)
        {
        }
    }
}
