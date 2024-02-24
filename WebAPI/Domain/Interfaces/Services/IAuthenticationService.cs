using Financial.Domain.DTO;
using Financial.Domain.Interfaces.Services.Base;
using Financial.Domain.Models;

namespace Financial.Domain.Interfaces.Services
{
    public interface IAuthenticationService : IBaseService<User>
    {
        Task<AuthRes> LoginAsync(Login user);
        bool ValidateToken(string token);
        Task RegisterAsync(Login user);
    }
}
