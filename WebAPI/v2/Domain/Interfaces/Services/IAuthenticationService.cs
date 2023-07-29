using Financial.v2.Domain.DTO;
using Financial.v2.Domain.Interfaces.Services.Base;
using Financial.v2.Domain.Models;

namespace Financial.v2.Domain.Interfaces.Services
{
    public interface IAuthenticationService : IBaseService<User>
    {
        Task<AuthRes> LoginAsync(Login user);
        bool ValidateToken(string token);

        Task RegisterAsync(Login user);
    }
}
