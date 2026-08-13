using MeetingRoomReservation.Api.DTOs;

namespace MeetingRoomReservation.Api.Services;

public interface IReservationService
{
    Task<IReadOnlyList<ReservationResponse>> GetAllAsync();

    Task<ReservationResponse?> GetByIdAsync(int id);

    Task<(ReservationResponse? Reservation, string? Error)> CreateAsync(
        CreateReservationRequest request);

    Task<bool> DeleteAsync(int id);
}