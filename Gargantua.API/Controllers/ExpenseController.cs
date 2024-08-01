using Gargantua.Domain.Entities;
using Gargantua.Domain.Interfaces.Services;
using Gargantua.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace Gargantua.Controllers
{
    [Route("api/[controller]")]
    public class ExpenseController : BaseController<Expense>
    {
        public ExpenseController(IExpenseService service) : base(service)
        {
        }

        public override Task<ActionResult<Expense>> Post(Expense entitiy)
        {
            entitiy.SetUser(User.GetId());

            return base.Post(entitiy);
        }
    }
}
