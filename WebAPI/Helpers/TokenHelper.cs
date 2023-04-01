using Microsoft.IdentityModel.Tokens;
using NuGet.Common;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Financial.Helpers
{
    public class TokenHelper
    {
        private readonly SymmetricSecurityKey key;
        private readonly string validIssuer;
        private readonly string validAudience;

        public TokenHelper(string validIssuer, string validAudience, string secretKey)
        {
            this.key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            this.validIssuer = validIssuer;
            this.validAudience = validAudience;
        }

        public string GenerateToken()
        {
            
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenOptions = new JwtSecurityToken(
                issuer: validIssuer,
                audience: validAudience,
                claims: new List<Claim>(),
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }

        public bool ValidateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidAudience = validAudience,
                    ValidIssuer = validIssuer,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
