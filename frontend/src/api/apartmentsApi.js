const productApi = process.env.NEXT_PUBLIC_PRODUCTS_;

export const getApartment = async (token) => {
    const res = await fetch(`${productApi}/apartment/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.status === 401) {
        const error = new Error('Unauthorized');
        error.status = 401;
        throw error;
    }

    if (!res.ok) {
        const error = new Error('Request failed');
        error.status = res.status;
        throw error;
    }

    return res.json();
};

export const getApartmentById = async (id, token) => {
    const res = await fetch(`${productApi}/apartment/${id}/`, {
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.status === 401) {
        const error = new Error('Unauthorized');
        error.status = 401;
        throw error;
    }

    if (!res.ok) {
        const error = new Error('Request failed');
        error.status = res.status;
        throw error;
    }

    return res.json();
};



export const getFiltredResult = async (
    minPrice,
    maxPrice,
    minRoom,
    maxRoom,
    city,
    token
) => {
    const params = new URLSearchParams();
    if (minPrice) params.append("min_price", minPrice);
    if (maxPrice) params.append("max_price", maxPrice);
    if (minRoom) params.append("min_room", minRoom);
    if (maxRoom) params.append("max_room", maxRoom);
    // if (city) params.append("city", city);

    const res = await fetch(`${productApi}/apartment/?${params.toString()}`, {
        cache: "no-store",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error(`Ошибка загрузки: ${res.status}`);
    }

    return await res.json();
};


export const getMyApartments = async (token) => {
    const res = await fetch(`${productApi}/apartment/my_apartments/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (res.status === 401) {
        const error = new Error('Unauthorized');
        error.status = 401;
        throw error;
    }

    if (!res.ok) {
        const error = new Error('Request failed');
        error.status = res.status;
        throw error;
    }

    return res.json();
};
