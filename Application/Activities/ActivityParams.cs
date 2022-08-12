using Application.Core;

namespace Application.Activities
{
    public class ActivityParams : PagingParams
    {
        public bool NotCompleted { get; set; }
        public bool Completed { get; set; }
        //public DateTime StartDate { get; set; } = DateTime.UtcNow;
        public string? Title { get; set; }
    }
}