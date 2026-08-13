namespace MeetingRoomReservation.Api.DTOs;

public class RoomResponse
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public int Capacity { get; set; }

    public string Description { get; set; } = string.Empty;
}