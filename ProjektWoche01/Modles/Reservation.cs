using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Reservation
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
   public ObjectId Id { get; set; }

    [BsonElement("roomId")]
    public string RoomId { get; set; }

    [BsonElement("user")]
    public string User { get; set; }  // <--- Das fehlte!

    [BsonElement("startTime")]
    public DateTime StartTime { get; set; }

    [BsonElement("endTime")]
    public DateTime EndTime { get; set; }
}
