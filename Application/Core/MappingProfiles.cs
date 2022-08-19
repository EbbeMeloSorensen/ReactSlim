using Application.People;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Person, Person>();
            CreateMap<Person, ActivityDto>();
        }
    }
}