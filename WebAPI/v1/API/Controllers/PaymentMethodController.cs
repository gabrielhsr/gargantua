using Microsoft.AspNetCore.Mvc;
using Financial.v1.Domain.Models;
using Financial.v2.Domain.Interfaces.Services.Base;
using Financial.v2.Controllers.Base;

namespace Financial.v1.API.Controllers
{
    [Route("api/{version:apiVersion}/[controller]")]
    [ApiVersion("1.0")]
    [ApiController]
    public class PaymentMethodController : BaseController<PaymentMethod>
    {
        public PaymentMethodController(IBaseService<PaymentMethod> service) : base(service)
        {
        }
    }
}
