using Financial.Domain.DTO;
using Financial.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Financial.API.Controllers
{
    [Route("api/[controller]")]
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
        public async Task<IList<Period>> GetPeriods()
        {
            return await service.GetPeriods();
        }
    }
}
