using MeetingRoomReservation.Api.DTOs;
using MeetingRoomReservation.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace MeetingRoomReservation.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReservationsController : ControllerBase
{
    private readonly IReservationService _reservationService;

    public ReservationsController(
        IReservationService reservationService)
    {
        _reservationService = reservationService;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<ReservationResponse>>> GetAll()
    {
        var reservations = await _reservationService.GetAllAsync();

        return Ok(reservations);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ReservationResponse>> GetById(int id)
    {
        var reservation = await _reservationService.GetByIdAsync(id);

        if (reservation == null)
        {
            return NotFound();
        }

        return Ok(reservation);
    }

    [HttpPost]
    public async Task<ActionResult<ReservationResponse>> Create(
        CreateReservationRequest request)
    {
        var result = await _reservationService.CreateAsync(request);

        if (result.Error != null)
        {
            if (result.Error == "Room not found.")
            {
                return NotFound(result.Error);
            }

            if (result.Error.Contains("already reserved"))
            {
                return Conflict(result.Error);
            }

            return BadRequest(result.Error);
        }

        return CreatedAtAction(
            nameof(GetById),
            new { id = result.Reservation!.Id },
            result.Reservation);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _reservationService.DeleteAsync(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}