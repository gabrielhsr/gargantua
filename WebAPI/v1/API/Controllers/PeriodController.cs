using Financial.v1.Domain.DTO;
using Financial.v1.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Financial.v1.API.Controllers
{
    [Route("api/{version:apiVersion}/[controller]")]
    [ApiVersion("1.0")]
    [ApiController]
    [Authorize]
    public class PeriodController : ControllerBase
    {
        private readonly IPeriodService service;

        public PeriodController(IPeriodService service)
        {
            this.service = service;
        }

        [HttpGet]
        public IList<Period> GetPeriods()
        {
            return service.GetPeriods();
        }
    }
}
