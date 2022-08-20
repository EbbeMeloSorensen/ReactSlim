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
                    //.Where(d => d.Deadline >= request.Params.StartDate)
                    .OrderBy(d => d.Deadline)
                    .ProjectTo<PersonDto>(_mapper.ConfigurationProvider,
                        new {currentUsername = _userAccessor.GetUsername()})
                    .AsQueryable();

                if (request.Params.NotCompleted && !request.Params.Completed)
                {
                    query = query.Where(x => !x.Completed);
                }

                if (request.Params.Completed && !request.Params.NotCompleted)
                {
                    query = query.Where(x => x.Completed);
                }

                if (!string.IsNullOrEmpty(request.Params.Title))
                {
                    query = query.Where(x => x.Title.Contains(request.Params.Title));
                }

                return Result<PagedList<PersonDto>>.Success(
                    await PagedList<PersonDto>.CreateAsync(query, request.Params.PageNumber,
                        request.Params.PageSize)
                );
            }
        }
    }
}