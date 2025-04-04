using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("api/reservations")]
public class ReservationsController : ControllerBase
{
    private readonly IMongoCollection<Reservation> _reservationsCollection;

    public ReservationsController(IMongoClient client)
    {
        var database = client.GetDatabase("MeetingDB");
        _reservationsCollection = database.GetCollection<Reservation>("Reservations");
    }

   [HttpGet]
public async Task<IActionResult> Get()
{
    var reservations = await _reservationsCollection.Find(_ => true).ToListAsync();
    var mappedReservations = reservations.Select(res => new {
         id = res.Id.ToString(),
         roomId = res.RoomId,
         user = res.User,
         startTime = res.StartTime,
         endTime = res.EndTime,
         roomName = res.RoomName 
    });
    return Ok(mappedReservations);
}


    [HttpPost]
    public async Task<IActionResult> Create(Reservation reservation)
    {
        await _reservationsCollection.InsertOneAsync(reservation);
        return CreatedAtAction(nameof(Get), new { id = reservation.Id }, reservation);
    }
}
