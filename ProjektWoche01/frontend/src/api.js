const API_URL = "http://localhost:5121/api"; 

export async function getReservations() {
    const response = await fetch(`${API_URL}/reservations`);
    return response.json();
}

export async function createReservation(reservation) {
    const response = await fetch(`${API_URL}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservation),
    });
    return response.json();
}
