using Financial.Data;
using Financial.Data.DTO;
using Financial.Data.Models;
using Financial.Helpers;
using Financial.Interfaces.Repositories;
using Financial.Interfaces.Services;
using Financial.Interfaces.Services.Base;
using Financial.Services.Base;
using Microsoft.EntityFrameworkCore;
using System.Security.Authentication;

namespace Financial.Services
{
    public class AuthenticationService: BaseService<User>, IAuthenticationService
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

            this.pepper = configuration.GetSection("Pepper").Value;
        }

        public async Task<AuthRes> LoginAsync(Login user)
        {
            var storedUser = await dbContext.User.FirstOrDefaultAsync(x => x.Email.Equals(user.Email));

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

        private async Task Register()
        {
            var user = new User
            {
                Email = "",
                PasswordSalt = PasswordHelper.GenerateSalt()
            };

            user.PasswordHash = PasswordHelper.ComputeHash("", user.PasswordSalt, pepper, iteration);

            await dbContext.AddAsync(user);
            await dbContext.SaveChangesAsync();
        }
    }
}
