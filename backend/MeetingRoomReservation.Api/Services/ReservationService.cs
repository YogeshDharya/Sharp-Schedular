using MeetingRoomReservation.Api.DTOs;
using MeetingRoomReservation.Api.Models;

namespace MeetingRoomReservation.Api.Services;

public class ReservationService : IReservationService
{
    private readonly IRoomService _roomService;

    private readonly List<Reservation> _reservations = new();

    private int _nextId = 1;

    private readonly object _lock = new();

    public ReservationService(IRoomService roomService)
    {
        _roomService = roomService;
    }

    public Task<IReadOnlyList<ReservationResponse>> GetAllAsync()
    {
        lock (_lock)
        {
            var result = _reservations
                .Select(MapToResponse)
                .ToList();

            return Task.FromResult<IReadOnlyList<ReservationResponse>>(result);
        }
    }

    public Task<ReservationResponse?> GetByIdAsync(int id)
    {
        lock (_lock)
        {
            var reservation = _reservations
                .FirstOrDefault(r => r.Id == id);

            if (reservation == null)
            {
                return Task.FromResult<ReservationResponse?>(null);
            }

            return Task.FromResult<ReservationResponse?>(
                MapToResponse(reservation));
        }
    }

    public async Task<(ReservationResponse? Reservation, string? Error)> CreateAsync(
        CreateReservationRequest request)
    {
        if (request.StartTime >= request.EndTime)
        {
            return (null, "Start time must be before end time.");
        }

        var room = await _roomService.GetByIdAsync(request.RoomId);

        if (room == null)
        {
            return (null, "Room not found.");
        }

        lock (_lock)
        {
            var overlappingReservation = _reservations.Any(r =>
                r.RoomId == request.RoomId &&
                request.StartTime < r.EndTime &&
                request.EndTime > r.StartTime);

            if (overlappingReservation)
            {
                return (
                    null,
                    "The room is already reserved during the selected time."
                );
            }

            var reservation = new Reservation
            {
                Id = _nextId++,
                RoomId = request.RoomId,
                StartTime = request.StartTime,
                EndTime = request.EndTime,
                CreatedAt = DateTime.UtcNow
            };

            _reservations.Add(reservation);

            return (MapToResponse(reservation), null);
        }
    }

    public Task<bool> DeleteAsync(int id)
    {
        lock (_lock)
        {
            var reservation = _reservations
                .FirstOrDefault(r => r.Id == id);

            if (reservation == null)
            {
                return Task.FromResult(false);
            }

            _reservations.Remove(reservation);

            return Task.FromResult(true);
        }
    }

    private ReservationResponse MapToResponse(Reservation reservation)
    {
        var room = _roomService
            .GetByIdAsync(reservation.RoomId)
            .GetAwaiter()
            .GetResult();

        return new ReservationResponse
        {
            Id = reservation.Id,
            RoomId = reservation.RoomId,
            RoomName = room?.Name ?? "Unknown",
            StartTime = reservation.StartTime,
            EndTime = reservation.EndTime,
            CreatedAt = reservation.CreatedAt
        };
    }
}