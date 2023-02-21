using Financial.Data.DTO;
using Financial.Data.Models;

namespace Financial.Interfaces.Services
{
    public interface IAuthenticationService : IBaseService<Login>
    {
        AuthRes ValidateProfile(Login login);
        bool ValidateToken(string? token);
        Task Register(Login login);
    }
}
