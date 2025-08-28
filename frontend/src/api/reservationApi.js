const productApi = process.env.NEXT_PUBLIC_PRODUCTS_;



export const createReservation = async (apartmentId, data, token) => {
    const res = await fetch(`${productApi}/reservations/create/${apartmentId}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorData = await res.json();
        const error = new Error("Reservation failed");
        error.status = res.status;
        error.data = errorData;
        throw error;
    }

    return res.json();
};

