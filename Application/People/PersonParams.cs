using Application.Core;

namespace Application.People
{
    public class PersonParams : PagingParams
    {
        public bool NotCompleted { get; set; }
        public bool Completed { get; set; }
        //public DateTime StartDate { get; set; } = DateTime.UtcNow;
        public string? Title { get; set; }
    }
}