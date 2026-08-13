namespace MeetingRoomReservation.Api.Models;

public class Reservation
{
    public int Id { get; set; }

    public int RoomId { get; set; }

    public DateTime StartTime { get; set; }

    public DateTime EndTime { get; set; }

    public DateTime CreatedAt { get; set; }
}