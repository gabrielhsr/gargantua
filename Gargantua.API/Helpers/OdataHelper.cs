using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;

namespace Gargantua.Helpers
{
    public static class OdataHelper
    {
        public static IEdmModel GetEdmModel()
        {
            var builder = new ODataConventionModelBuilder();

            return builder.GetEdmModel();
        }
    }
}
