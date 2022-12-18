namespace Financial.Helpers
{
    public static class IdHelper
    {
        public static bool IsNullOrDefault(Guid? id)
        {
            if (id == Guid.Empty || id is null) return true;

            return false;
        }
    }
}
