using Financial.Data.DTO;
using Financial.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Financial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeriodController
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
