using Microsoft.Extensions.Options;
using MongoDB.Driver;

public class MongoDBService
{
    private readonly IMongoDatabase _database;

    public MongoDBService(IOptions<MongoDBSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        _database = client.GetDatabase(settings.Value.DatabaseName);
    }

    public IMongoCollection<MeetingRoom> MeetingRooms =>
        _database.GetCollection<MeetingRoom>("MeetingRooms");

    public IMongoCollection<Reservation> Reservations =>
        _database.GetCollection<Reservation>("Reservations");
}

// Konfigurationsklasse für MongoDB
public class MongoDBSettings
{
    public string ConnectionString { get; set; } = null!;
    public string DatabaseName { get; set; } = null!;
}
