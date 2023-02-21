using Financial.Data.Models;
using Financial.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Authentication;

namespace Financial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            this.authenticationService = authenticationService;
        }

        [HttpPost("signIn")]
        public IActionResult SignIn([FromBody] Login login) 
        {
            if (login is null)
            {
                return BadRequest();
            }

            try
            {
                var result = authenticationService.ValidateProfile(login);

                return Ok(result);
            }
            catch (AuthenticationException)
            {
                return Unauthorized();
            }
        }
    }
}
