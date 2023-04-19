using Financial.Data.DTO;
using Financial.Data.Models;
using Financial.Interfaces.Services.Base;

namespace Financial.Interfaces.Services
{
    public interface IAuthenticationService : IBaseService<User>
    {
        Task<AuthRes> LoginAsync(Login user);
        bool ValidateToken(string token);
    }
}
