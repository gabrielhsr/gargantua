using Gargantua.Domain.Entities;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;
using System.Reflection;

namespace Gargantua.Helpers
{
    public static class OdataHelper
    {
        public static IEdmModel GetEdmModel()
        {
            var builder = new ODataConventionModelBuilder();

            MapBaseEntities(builder);

            return builder.GetEdmModel();
        }

        private static void MapBaseEntities(ODataConventionModelBuilder builder)
        {
            var baseEntities = Assembly
                .GetAssembly(typeof(BaseEntity<>))
                .GetTypes()
                .Where(type => type.IsSubclassOf(typeof(BaseEntity<>)))
                .Where(type => !type.IsAbstract);

            foreach (var baseEntity in baseEntities)
            {
                var entitySetMethod = typeof(ODataConventionModelBuilder).GetMethod("EntitySet");
                var genericEntitySetMethod = entitySetMethod.MakeGenericMethod(baseEntity);

                genericEntitySetMethod.Invoke(builder, new object[] { baseEntity.Name });
            }
        }
    }
}
