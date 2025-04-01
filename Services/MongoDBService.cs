using MongoDB.Driver;

public class MongoDBService
{
    private readonly IMongoDatabase _database;

    public MongoDBService(IMongoClient client)
    {
        _database = client.GetDatabase("MeetingDB");
    }

    public IMongoCollection<MeetingRoom> MeetingRooms => _database.GetCollection<MeetingRoom>("MeetingRooms");
    public IMongoCollection<Reservation> Reservations => _database.GetCollection<Reservation>("Reservations");
}
