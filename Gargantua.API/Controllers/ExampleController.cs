using Gargantua.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace Gargantua.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ExampleController : ODataController
    {
        [HttpGet]
        [EnableQuery]
        public IQueryable<Example> Get()
        {
            var list = new List<Example>();

            for (int i = 0; i < 10; i++)
            {
                var example = new Example()
                {
                    Id = Guid.NewGuid(),
                    Name = $"Test {i}",
                };

                list.Add(example);
            }

            return list.AsQueryable();
        }
    }
}
