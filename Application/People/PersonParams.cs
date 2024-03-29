using Application.Core;

namespace Application.People
{
    public class PersonParams : PagingParams
    {
        //public DateTime StartDate { get; set; } = DateTime.UtcNow;
        public string? Name { get; set; }
        public string? Category { get; set; }
        public string? Dead { get; set; }
        public string Sorting { get; set; }

        public PersonParams()
        {
            Sorting = "name";
        }
    }
}