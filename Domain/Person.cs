namespace Domain
{
    public class Person
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = null!;
        public DateTime Birthday { get; set; }
        public string? Description { get; set; }
        public bool Completed { get; set; }
    }
}