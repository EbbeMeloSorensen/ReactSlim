using Domain;
using FluentValidation;

namespace Application.People
{
    public class ActivityValidator : AbstractValidator<Person>
    {
        public ActivityValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Deadline).NotEmpty();
        }
    }
}