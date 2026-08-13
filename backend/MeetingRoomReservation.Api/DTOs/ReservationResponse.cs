namespace MeetingRoomReservation.Api.DTOs;

public class ReservationResponse
{
    public int Id { get; set; }

    public int RoomId { get; set; }

    public string RoomName { get; set; } = string.Empty;

    public DateTime StartTime { get; set; }

    public DateTime EndTime { get; set; }

    public DateTime CreatedAt { get; set; }
}