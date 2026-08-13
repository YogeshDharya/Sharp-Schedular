using MeetingRoomReservation.Api.DTOs;

namespace MeetingRoomReservation.Api.Services;

public interface IRoomService
{
    Task<IReadOnlyList<RoomResponse>> GetAllAsync();

    Task<RoomResponse?> GetByIdAsync(int id);

    Task<RoomResponse> CreateAsync(CreateRoomRequest request);
}