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
                    .OrderBy(d => d.Birthday)
                    .ProjectTo<PersonDto>(_mapper.ConfigurationProvider,
                        new {currentUsername = _userAccessor.GetUsername()})
                    .AsQueryable();

                //Console.WriteLine($"request.Params.Completed: {request.Params.Completed}");
                //Console.WriteLine($"request.Params.NotCompleted: {request.Params.NotCompleted}");

                if (request.Params.NotCompleted && !request.Params.Completed)
                {
                    query = query.Where(x => x.Completed.HasValue && !x.Completed.Value);
                }

                if (request.Params.Completed && !request.Params.NotCompleted)
                {
                    query = query.Where(x => x.Completed.HasValue && x.Completed.Value);
                }

                //query = query.Where(x => x.FirstName.Contains("Hugo"));
                //query = query.Where(x => x.Completed.HasValue && x.Completed.Value);

                if (!string.IsNullOrEmpty(request.Params.FirstName))
                {
                    query = query.Where(x => x.FirstName.Contains(request.Params.FirstName));
                }

                return Result<PagedList<PersonDto>>.Success(
                    await PagedList<PersonDto>.CreateAsync(query, request.Params.PageNumber,
                        request.Params.PageSize)
                );
            }
        }
    }
}