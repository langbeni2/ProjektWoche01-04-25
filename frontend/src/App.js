import React, { useEffect, useState } from "react";

function App() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Hier deine Backend-URL eintragen!
    fetch("https://localhost:5001/api/meetingrooms")
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((error) => console.error("Fehler beim Laden:", error));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Besprechungsräume</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Kapazität</th>
            <th>Ausstattung</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.name}</td>
              <td>{room.capacity}</td>
              <td>{room.equipment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
