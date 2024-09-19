using Gargantua.Domain.Entities;
using Gargantua.Domain.Interfaces.Services.Base;
using Microsoft.AspNetCore.Mvc;

namespace Gargantua.Controllers
{
    [Route("api/[controller]")]
    public class BenchmarkController : BaseController<Benchmark, int>
    {
        public BenchmarkController(IBaseService<Benchmark, int> service) : base(service)
        {
        }
    }
}
