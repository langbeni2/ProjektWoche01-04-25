using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("api/rooms")]
public class MeetingRoomsController : ControllerBase
{
    private readonly IMongoCollection<MeetingRoom> _roomsCollection;

    public MeetingRoomsController(IMongoClient client)
    {
        var database = client.GetDatabase("MeetingDB");
        _roomsCollection = database.GetCollection<MeetingRoom>("MeetingRooms");
    }

    [HttpGet]
    public async Task<IEnumerable<MeetingRoom>> Get() =>
        await _roomsCollection.Find(_ => true).ToListAsync();

    [HttpPost]
    public async Task<IActionResult> Create(MeetingRoom room)
    {
        await _roomsCollection.InsertOneAsync(room);
        return CreatedAtAction(nameof(Get), new { id = room.Id }, room);
    }
}
