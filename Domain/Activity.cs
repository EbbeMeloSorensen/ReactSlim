namespace Domain
{
    public class Activity
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public DateTime Deadline { get; set; }
        public string? Description { get; set; }
        //public string? Category { get; set; }
        public bool Completed { get; set; }
    }
}