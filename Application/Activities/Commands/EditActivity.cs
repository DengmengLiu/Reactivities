using System;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .FindAsync([request.Activity.Id], cancellationToken) 
                ?? throw new Exception("Activity not found");

            // Use AutoMapper to map the properties from the request to the activity entity
            mapper.Map(request.Activity, activity);

            // Alternatively, manually map the properties if you prefer not to use AutoMapper
            // activity.Title = request.Activity.Title;
            // activity.Description = request.Activity.Description;
            // activity.Date = request.Activity.Date;
            // activity.Category = request.Activity.Category;
            // activity.City = request.Activity.City;
            // activity.Venue = request.Activity.Venue;

            await context.SaveChangesAsync(cancellationToken);
        }
    }

}
