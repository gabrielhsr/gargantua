using Microsoft.AspNetCore.Mvc;
using Financial.Domain.Models;
using Financial.Domain.Interfaces.Services.Base;

namespace Financial.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentMethodController : BaseController<PaymentMethod>
    {
        public PaymentMethodController(IBaseService<PaymentMethod> service) : base(service)
        {
        }
    }
}
