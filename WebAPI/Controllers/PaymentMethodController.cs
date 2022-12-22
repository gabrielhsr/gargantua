using Financial.Data.Models;
using Financial.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Financial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentMethodController : BaseController<PaymentMethod>
    {
        public PaymentMethodController(IBaseRepository<PaymentMethod> repository) : base(repository)
        {
        }
    }
}
