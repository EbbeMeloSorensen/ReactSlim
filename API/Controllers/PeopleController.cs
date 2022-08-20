using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.People;

namespace API.Controllers
{
    public class PeopleController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetPeople([FromQuery] PersonParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPerson(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePerson(Person person)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Person = person }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPerson(Guid id, Person person)
        {
            person.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Person = person}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePerson(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}