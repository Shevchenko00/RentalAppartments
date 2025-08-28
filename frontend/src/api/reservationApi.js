const productApi = process.env.NEXT_PUBLIC_PRODUCTS_;


export const createReservation = async (apartmentId, data, token) => {
    const res = await fetch(`${productApi}/reservations/create/${apartmentId}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        let errorData = {};
        try {
            errorData = await res.json();
        } catch (err) {
            console.error("Failed to parse error response:", err);
        }
        const error = new Error("Reservation failed");
        error.status = res.status;
        error.data = errorData;
        throw error;
    }

    return res.json();
};


export const fetchUserReservations = async (token) => {
    const res = await fetch(`${productApi}/reservations/user/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch user reservations");

    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.results)) return data.results;

    return [];
};


export const fetchLandlordReservations = async (token) => {
    const res = await fetch(`${productApi}/reservations/landlord/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch landlord reservations");

    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.results)) return data.results;

    return [];
};


export const approveReservation = async (reservationId, token) => {
    const res = await fetch(`${productApi}/reservations/approve/${reservationId}/`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to approve reservation");
    return res.json();
};


export const cancelReservation = async (reservationId, token) => {
    const res = await fetch(`${productApi}/reservations/cancel/${reservationId}/`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to cancel reservation");
    return res.json();
};
