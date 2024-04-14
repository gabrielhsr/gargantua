namespace Financial.Core.Extensions
{
    public static class GuidExtensions
    {
        public static bool IsNullOrDefault(this Guid? id)
        {
            return id == Guid.Empty || id is null;
        }

        public static bool IsNullOrDefault(this Guid id)
        {
            return id == Guid.Empty;
        }
    }
}
