import React, { useState } from "react";

function App() {
  const [rooms, setRooms] = useState([
    { id: 1, name: "Raum A", capacity: 10, equipment: "Beamer" },
    { id: 2, name: "Raum B", capacity: 6, equipment: "TV" }
  ]);

  const [formRoom, setFormRoom] = useState({
    id: null,
    name: "",
    capacity: "",
    equipment: ""
  });

  const [reservations] = useState([
    {
      id: 1,
      roomName: "Raum A",
      reservedBy: "Max Mustermann",
      date: "2025-04-02",
      time: "10:00"
    },
    {
      id: 2,
      roomName: "Raum B",
      reservedBy: "Lisa Müller",
      date: "2025-04-02",
      time: "14:00"
    }
  ]);

  const handleChange = (e) => {
    setFormRoom({
      ...formRoom,
      [e.target.name]: e.target.value
    });
  };

  const handleAddOrUpdateRoom = () => {
    if (formRoom.id === null) {
      const newId = rooms.length > 0 ? rooms[rooms.length - 1].id + 1 : 1;
      const newRoom = { id: newId, ...formRoom };
      setRooms([...rooms, newRoom]);
    } else {
      const updatedRooms = rooms.map((room) =>
        room.id === formRoom.id ? formRoom : room
      );
      setRooms(updatedRooms);
    }
    setFormRoom({ id: null, name: "", capacity: "", equipment: "" });
  };

  const handleDeleteRoom = (id) => {
    const updatedRooms = rooms.filter((room) => room.id !== id);
    setRooms(updatedRooms);
    if (formRoom.id === id) {
      setFormRoom({ id: null, name: "", capacity: "", equipment: "" });
    }
  };

  const handleEditRoom = (room) => {
    setFormRoom(room);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Besprechungsräume</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Kapazität</th>
            <th>Ausstattung</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.name}</td>
              <td>{room.capacity}</td>
              <td>{room.equipment}</td>
              <td>
                <button onClick={() => handleEditRoom(room)}>Bearbeiten</button>
                <button onClick={() => handleDeleteRoom(room.id)}>Löschen</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: "30px" }}>
        {formRoom.id === null ? "Neuen Raum hinzufügen" : "Raum bearbeiten"}
      </h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formRoom.name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="capacity"
        placeholder="Kapazität"
        value={formRoom.capacity}
        onChange={handleChange}
      />
      <input
        type="text"
        name="equipment"
        placeholder="Ausstattung"
        value={formRoom.equipment}
        onChange={handleChange}
      />
      <button onClick={handleAddOrUpdateRoom} style={{ marginLeft: "10px" }}>
        {formRoom.id === null ? "Hinzufügen" : "Speichern"}
      </button>

      <h2 style={{ marginTop: "50px" }}>Reservierungen (Listenansicht)</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Raum</th>
            <th>Reserviert von</th>
            <th>Datum</th>
            <th>Uhrzeit</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id}>
              <td>{res.roomName}</td>
              <td>{res.reservedBy}</td>
              <td>{res.date}</td>
              <td>{res.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
