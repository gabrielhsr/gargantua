using Financial.Core.Helpers;
using Financial.Core.Services.Base;
using Financial.Domain.DTO;
using Financial.Domain.Interfaces.Services;
using Financial.Domain.Interfaces.Services.Base;
using Financial.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Authentication;

namespace Financial.Core.Services
{
    public class AuthenticationService : BaseService<User>, IAuthenticationService
    {
        private readonly TokenHelper tokenHelper;
        private readonly string pepper;
        private readonly int iteration = 5;

        public AuthenticationService(IDependencyAggregate<User> aggregate, IConfiguration configuration) : base(aggregate)
        {
            var validIssuer = configuration.GetSection("ValidIssuer").Value;
            var validAudience = configuration.GetSection("ValidAudience").Value;
            var tokenSecretKey = configuration.GetSection("IssuerSigningKey").Value;

            tokenHelper = new TokenHelper(validIssuer, validAudience, tokenSecretKey);

            pepper = configuration.GetSection("Pepper").Value;
        }

        public async Task<AuthRes> LoginAsync(Login user)
        {
            var storedUser = await repository.Context.User.FirstOrDefaultAsync(x => x.Email.Equals(user.Email));

            if (storedUser is not null)
            {
                var passwordHash = PasswordHelper.ComputeHash(user.Password, storedUser.PasswordSalt, pepper, iteration);

                if (passwordHash == storedUser.PasswordHash)
                {
                    return new AuthRes { Token = tokenHelper.GenerateToken(storedUser) };
                }
            }

            throw new AuthenticationException();
        }

        public bool ValidateToken(string token)
        {
            return tokenHelper.ValidateToken(token);
        }

        public async Task RegisterAsync(Login login)
        {
            var user = new User
            {
                Email = login.Email,
                PasswordSalt = PasswordHelper.GenerateSalt()
            };

            user.PasswordHash = PasswordHelper.ComputeHash(login.Password, user.PasswordSalt, pepper, iteration);

            await repository.Context.AddAsync(user);
            await repository.Context.SaveChangesAsync();
        }
    }
}
