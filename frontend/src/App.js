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

  const [reservations, setReservations] = useState([
    {
      id: 1,
      roomName: "Raum A",
      reservedBy: "Max Mustermann",
      date: "2025-04-02",
      time: "10:00"
    }
  ]);

  const [formReservation, setFormReservation] = useState({
    id: null,
    roomName: "",
    reservedBy: "",
    date: "",
    time: ""
  });

  // Räume
  const handleChangeRoom = (e) => {
    setFormRoom({ ...formRoom, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateRoom = () => {
    if (formRoom.id === null) {
      const newId = rooms.length > 0 ? rooms[rooms.length - 1].id + 1 : 1;
      setRooms([...rooms, { id: newId, ...formRoom }]);
    } else {
      const updated = rooms.map((r) => (r.id === formRoom.id ? formRoom : r));
      setRooms(updated);
    }
    setFormRoom({ id: null, name: "", capacity: "", equipment: "" });
  };

  const handleDeleteRoom = (id) => {
    setRooms(rooms.filter((r) => r.id !== id));
    if (formRoom.id === id) {
      setFormRoom({ id: null, name: "", capacity: "", equipment: "" });
    }
  };

  const handleEditRoom = (room) => setFormRoom(room);

  // Reservierungen
  const handleChangeReservation = (e) => {
    setFormReservation({ ...formReservation, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateReservation = () => {
    if (formReservation.id === null) {
      const newId =
        reservations.length > 0 ? reservations[reservations.length - 1].id + 1 : 1;
      setReservations([...reservations, { id: newId, ...formReservation }]);
    } else {
      const updated = reservations.map((r) =>
        r.id === formReservation.id ? formReservation : r
      );
      setReservations(updated);
    }
    setFormReservation({ id: null, roomName: "", reservedBy: "", date: "", time: "" });
  };

  const handleEditReservation = (res) => setFormReservation(res);

  const handleDeleteReservation = (id) =>
    setReservations(reservations.filter((r) => r.id !== id));

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
        onChange={handleChangeRoom}
      />
      <input
        type="number"
        name="capacity"
        placeholder="Kapazität"
        value={formRoom.capacity}
        onChange={handleChangeRoom}
      />
      <input
        type="text"
        name="equipment"
        placeholder="Ausstattung"
        value={formRoom.equipment}
        onChange={handleChangeRoom}
      />
      <button onClick={handleAddOrUpdateRoom}>
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
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id}>
              <td>{res.roomName}</td>
              <td>{res.reservedBy}</td>
              <td>{res.date}</td>
              <td>{res.time}</td>
              <td>
                <button onClick={() => handleEditReservation(res)}>Bearbeiten</button>
                <button onClick={() => handleDeleteReservation(res.id)}>Löschen</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: "30px" }}>
        {formReservation.id === null
          ? "Neue Reservierung"
          : "Reservierung bearbeiten"}
      </h2>
      <select
        name="roomName"
        value={formReservation.roomName}
        onChange={handleChangeReservation}
      >
        <option value="">Raum auswählen</option>
        {rooms.map((r) => (
          <option key={r.id} value={r.name}>
            {r.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="reservedBy"
        placeholder="Reserviert von"
        value={formReservation.reservedBy}
        onChange={handleChangeReservation}
      />
      <input
        type="date"
        name="date"
        value={formReservation.date}
        onChange={handleChangeReservation}
      />
      <input
        type="time"
        name="time"
        value={formReservation.time}
        onChange={handleChangeReservation}
      />
      <button onClick={handleAddOrUpdateReservation}>
        {formReservation.id === null ? "Hinzufügen" : "Speichern"}
      </button>
    </div>
  );
}

export default App;
