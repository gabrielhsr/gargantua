using System.Security.Claims;

namespace Gargantua.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static Guid GetId(this ClaimsPrincipal principal)
        {
            var id = principal.Claims.FirstOrDefault(x => x.Type == "Id")?.Value;
            var parsed = Guid.TryParse(id, out Guid parsedId);

            if (!parsed)
            {
                throw new InvalidDataException("User Id cannot be parsed!");
            }

            return parsedId;
        }
    }
}
