using MeetingRoomReservation.Api.DTOs;
using MeetingRoomReservation.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace MeetingRoomReservation.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoomsController : ControllerBase
{
    private readonly IRoomService _roomService;

    public RoomsController(IRoomService roomService)
    {
        _roomService = roomService;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<RoomResponse>>> GetAll()
    {
        var rooms = await _roomService.GetAllAsync();

        return Ok(rooms);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<RoomResponse>> GetById(int id)
    {
        var room = await _roomService.GetByIdAsync(id);

        if (room == null)
        {
            return NotFound();
        }

        return Ok(room);
    }

    [HttpPost]
    public async Task<ActionResult<RoomResponse>> Create(
        CreateRoomRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return BadRequest("Room name is required.");
        }

        if (request.Capacity <= 0)
        {
            return BadRequest("Capacity must be greater than zero.");
        }

        var room = await _roomService.CreateAsync(request);

        return CreatedAtAction(
            nameof(GetById),
            new { id = room.Id },
            room);
    }
}