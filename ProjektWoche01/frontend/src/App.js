import React, { useState, useEffect } from "react";

function App() {
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [formRoom, setFormRoom] = useState({ id: null, name: "", capacity: "", equipment: "" });
  const [formReservation, setFormReservation] = useState({
    id: null,
    roomId: "", 
    reservedBy: "",
    date: "",
    time: ""
  });
  
  // Räume abrufen
  useEffect(() => {
    fetch("http://localhost:5121/api/rooms")
      .then((response) => response.json())
      .then((data) => {
        console.log("Daten vom Server (Räume):", data);
        setRooms(data);
      })
      .catch((error) => console.error("Fehler beim Laden der Räume:", error));
  }, []);

  // Reservierungen abrufen
  useEffect(() => {
    fetch("http://localhost:5121/api/reservations")
      .then((response) => response.json())
      .then((data) => {
        console.log("Reservierungs-Daten:", data);
        setReservations(data);
      })
      .catch((error) => console.error("Fehler beim Laden der Reservierungen:", error));
  }, []);

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
    // Hier kannst du noch einen Konflikt-Check einbauen, falls benötigt.
    if (formReservation.id === null) {
      // Neue Reservierung erstellen: Startzeit aus Datum und Uhrzeit zusammenführen
      const start = new Date(formReservation.date + "T" + formReservation.time);
      // Beispiel: Endzeit = Startzeit + 1 Stunde
      const end = new Date(start.getTime() + 60 * 60 * 1000);

      const newReservation = {
        roomId: formReservation.roomId, // statt formReservation.roomName
        user: formReservation.reservedBy,
        startTime: start.toISOString(),
        endTime: end.toISOString()
      };
      

      fetch("http://localhost:5121/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newReservation)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Fehler beim Speichern der Reservierung");
          }
          return response.json();
        })
        .then((savedReservation) => {
          // Neue Reservierung in den lokalen State einfügen
          setReservations([...reservations, savedReservation]);
          setFormReservation({ id: null, roomId: "", reservedBy: "", date: "", time: "" });

        })
        .catch((error) => console.error("Fehler beim Speichern der Reservierung:", error));
    } else {
      // Logik zum Aktualisieren einer Reservierung (PUT/PATCH) falls benötigt
    }
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

      <h2>{formRoom.id === null ? "Neuen Raum hinzufügen" : "Raum bearbeiten"}</h2>
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

      <h2>Reservierungen</h2>
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
          {reservations.map((res, index) => {
            // Finde anhand der roomId den Raumnamen aus der rooms-Liste
            const room = rooms.find((r) => r.id === res.roomId);
            const roomName = room ? room.name : res.roomId;
            const startDate = new Date(res.startTime);
            return (
              <tr key={res.id ? res.id.toString() : `reservation-${index}`}>
                <td>{roomName}</td>
                <td>{res.user}</td>
                <td>{startDate.toLocaleDateString()}</td>
                <td>{startDate.toLocaleTimeString()}</td>
                <td>
                  <button onClick={() => handleEditReservation(res)}>
                    Bearbeiten
                  </button>
                  <button onClick={() => handleDeleteReservation(res.id)}>
                    Löschen
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>
        {formReservation.id === null ? "Neue Reservierung" : "Reservierung bearbeiten"}
      </h2>
      <select name="roomId" value={formReservation.roomId || ""} onChange={handleChangeReservation}>
  <option value="">Raum auswählen</option>
  {rooms.map((r) => (
    <option key={r.id} value={r.id}>{r.name}</option>
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
