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
    public async Task<IEnumerable<Reservation>> Get() =>
        await _reservationsCollection.Find(_ => true).ToListAsync();

    [HttpPost]
    public async Task<IActionResult> Create(Reservation reservation)
    {
        await _reservationsCollection.InsertOneAsync(reservation);
        return CreatedAtAction(nameof(Get), new { id = reservation.Id }, reservation);
    }
}
