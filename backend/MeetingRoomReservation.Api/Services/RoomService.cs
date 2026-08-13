using MeetingRoomReservation.Api.DTOs;
using MeetingRoomReservation.Api.Models;

namespace MeetingRoomReservation.Api.Services;

public class RoomService : IRoomService
{
    private readonly List<Room> _rooms = new()
    {
        new Room
        {
            Id = 1,
            Name = "Room A",
            Capacity = 10,
            Description = "Small meeting room suitable for team discussions."
        },
        new Room
        {
            Id = 2,
            Name = "Room B",
            Capacity = 6,
            Description = "Compact room suitable for small meetings."
        },
        new Room
        {
            Id = 3,
            Name = "Room C",
            Capacity = 20,
            Description = "Large conference room for bigger meetings."
        }
    };

    private int _nextId = 4;

    public Task<IReadOnlyList<RoomResponse>> GetAllAsync()
    {
        var result = _rooms
            .Select(MapToResponse)
            .ToList();

        return Task.FromResult<IReadOnlyList<RoomResponse>>(result);
    }

    public Task<RoomResponse?> GetByIdAsync(int id)
    {
        var room = _rooms.FirstOrDefault(r => r.Id == id);

        if (room == null)
        {
            return Task.FromResult<RoomResponse?>(null);
        }

        return Task.FromResult<RoomResponse?>(MapToResponse(room));
    }

    public Task<RoomResponse> CreateAsync(CreateRoomRequest request)
    {
        var room = new Room
        {
            Id = _nextId++,
            Name = request.Name,
            Capacity = request.Capacity,
            Description = request.Description
        };

        _rooms.Add(room);

        return Task.FromResult(MapToResponse(room));
    }

    private static RoomResponse MapToResponse(Room room)
    {
        return new RoomResponse
        {
            Id = room.Id,
            Name = room.Name,
            Capacity = room.Capacity,
            Description = room.Description
        };
    }
}