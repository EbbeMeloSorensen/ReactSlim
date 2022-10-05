using System.Linq;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.People
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<PersonDto>>>
        {
            public PersonParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<PersonDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<PagedList<PersonDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.People
                    //.Where(d => d.Birthday >= request.Params.StartDate)
                    .OrderBy(d => d.FirstName)
                    .ProjectTo<PersonDto>(_mapper.ConfigurationProvider,
                        new {currentUsername = _userAccessor.GetUsername()})
                    .AsQueryable();

                if (!string.IsNullOrEmpty(request.Params.Dead))
                {
                    var filterAsListOfStrings = new List<string>(request.Params.Dead.Split("|"));

                    if (filterAsListOfStrings.Count == 1 && filterAsListOfStrings.Single() == "null")
                    {
                        query = query.Where(x => !x.Dead.HasValue);
                    }
                    else
                    {
                        var filter = ConvertToBoolList(filterAsListOfStrings);

                        query = filterAsListOfStrings.Contains("null")
                            ? query = query.Where(x => !x.Dead.HasValue || filter.Contains(x.Dead.Value))
                            : query = query.Where(x => x.Dead.HasValue && filter.Contains(x.Dead.Value));
                    }
                }

                if (!string.IsNullOrEmpty(request.Params.Name))
                {
                    var filter = request.Params.Name.ToLower();
                    query = query.Where(x => 
                        x.FirstName.ToLower().Contains(filter) ||
                        (!string.IsNullOrEmpty(x.Surname) && x.Surname.ToLower().Contains(filter)));
                }

                return Result<PagedList<PersonDto>>.Success(
                    await PagedList<PersonDto>.CreateAsync(query, request.Params.PageNumber,
                        request.Params.PageSize)
                );
            }

            private List<bool> ConvertToBoolList(IEnumerable<string> items)
            {
                var result = new List<bool>();

                if (items.Contains("true"))
                {
                    result.Add(true);
                }

                if (items.Contains("false"))
                {
                    result.Add(false);
                }

                return result;
            }
        }
    }
}