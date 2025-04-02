import React, { useState } from "react";

function App() {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Raum A",
      capacity: 10,
      equipment: "Beamer, Whiteboard"
    },
    {
      id: 2,
      name: "Raum B",
      capacity: 6,
      equipment: "TV, HDMI"
    }
  ]);

  const [formRoom, setFormRoom] = useState({
    id: null,
    name: "",
    capacity: "",
    equipment: ""
  });

  const handleChange = (e) => {
    setFormRoom({
      ...formRoom,
      [e.target.name]: e.target.value
    });
  };

  const handleAddOrUpdateRoom = () => {
    if (formRoom.id === null) {
      // Neuer Raum
      const newId = rooms.length > 0 ? rooms[rooms.length - 1].id + 1 : 1;
      const newRoom = { id: newId, ...formRoom };
      setRooms([...rooms, newRoom]);
    } else {
      // Bestehenden Raum aktualisieren
      const updatedRooms = rooms.map((room) =>
        room.id === formRoom.id ? formRoom : room
      );
      setRooms(updatedRooms);
    }
    // Formular zurücksetzen
    setFormRoom({ id: null, name: "", capacity: "", equipment: "" });
  };

  const handleDeleteRoom = (id) => {
    const updatedRooms = rooms.filter((room) => room.id !== id);
    setRooms(updatedRooms);
    // Falls man gerade diesen bearbeitet → abbrechen
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
    </div>
  );
}

export default App;
