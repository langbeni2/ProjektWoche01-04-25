

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

public class MeetingRoom
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("capacity")]
    public int Capacity { get; set; }

    [BsonElement("equipment")] 
    public List<string> Equipment { get; set; } = new List<string>();
}
