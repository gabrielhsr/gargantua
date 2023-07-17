namespace Financial.v2.Core.Helpers
{
    public static class IdHelper
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
