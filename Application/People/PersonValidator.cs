using Domain;
using FluentValidation;

namespace Application.People
{
    public class PersonValidator : AbstractValidator<Person>
    {
        public PersonValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty();
            //RuleFor(x => x.Surname).NotEmpty();
            //RuleFor(x => x.Description).NotEmpty();
            //RuleFor(x => x.Birthday).NotEmpty();
        }
    }
}