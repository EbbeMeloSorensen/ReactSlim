namespace Application.Activities
{
    public class ActivityDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public DateTime Deadline { get; set; }
        public string Description { get; set; } = null!;
        public bool Completed { get; set; }
    }
}