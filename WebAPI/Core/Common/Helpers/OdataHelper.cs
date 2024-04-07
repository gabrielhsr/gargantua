using Financial.Domain.Models;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;

namespace Financial.Core.Common.Helpers
{
    public static class OdataHelper
    {
        public static IEdmModel GetEdmModel()
        {
            var builder = new ODataConventionModelBuilder();

            builder.EntitySet<PaymentMethod>(nameof(PaymentMethod)).EntityType.HasKey(x => x.Id);
            builder.EntitySet<Category>(nameof(Category)).EntityType.HasKey(x => x.Id);

            return builder.GetEdmModel();
        }
    }
}
