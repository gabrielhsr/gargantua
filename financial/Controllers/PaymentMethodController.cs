using AutoMapper;
using Financial.Data.Models;
using Financial.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Financial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentMethodController : BaseController<PaymentMethod, PaymentMethodDto>
    {
        public PaymentMethodController(IBaseRepository<PaymentMethod> repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}
