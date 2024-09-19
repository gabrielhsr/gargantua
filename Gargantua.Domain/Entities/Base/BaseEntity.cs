namespace Gargantua.Domain.Entities
{
    public abstract class BaseEntity<TID>
    {
        public TID Id { get; set; }
    }
}
