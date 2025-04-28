using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required EditActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .FindAsync([request.ActivityDto.Id], cancellationToken);
            if (activity == null) return Result<Unit>.Failure("Activity not found", 404);

            // Use AutoMapper to map the properties from the request to the activity entity
            mapper.Map(request.ActivityDto, activity);

            // Alternatively, manually map the properties if you prefer not to use AutoMapper
            // activity.Title = request.Activity.Title;
            // activity.Description = request.Activity.Description;
            // activity.Date = request.Activity.Date;
            // activity.Category = request.Activity.Category;
            // activity.City = request.Activity.City;
            // activity.Venue = request.Activity.Venue;

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Failed to update the activity", 400);

            return Result<Unit>.Success(Unit.Value);
        }
    }

}
