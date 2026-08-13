namespace MeetingRoomReservation.Api.DTOs;

public class CreateReservationRequest
{
    public int RoomId { get; set; }

    public DateTime StartTime { get; set; }

    public DateTime EndTime { get; set; }
}