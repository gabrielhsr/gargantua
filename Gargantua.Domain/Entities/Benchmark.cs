namespace Gargantua.Domain.Entities
{
    public class Benchmark : BaseEntity<int>
    {
        public bool Excluded { get; set; }

        public DateTimeOffset DateTimeUtc { get; set; }

        public string Session { get; set; }

        public string Scenario { get; set; }

        public string Description { get; set; }

        public string Document { get; set; }
    }
}
