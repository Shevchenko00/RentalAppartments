import {fetchNewToken} from "@/api/auth";

const productApi = process.env.NEXT_PUBLIC_PRODUCTS_;
import getCookie from "@/uttils/getCookie/getCookie";


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





export const fetchApartment = async (id, router, setApartment, setLoading) => {
    const token = getCookie('access_token');
    const refreshToken = getCookie('refresh_token');

    if (!id) {
        console.warn('ID is missing in URL');
        router.push('/');
        return;
    }

    try {
        const data = await getApartmentById(id, token);
        setApartment(data);
    } catch (error) {
        if (error.status === 401) {
            try {
                await fetchNewToken(refreshToken);
            } catch (error) {
                if (error.status === 422 || error.status === 401) {
                    router.push('/login');
                    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                }
            }
        }
    } finally {
        setLoading(false);
    }
};


export const updateApartment = async (id, data, token) => {
    const res = await fetch(`${productApi}/apartment/update_apartment/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error("Failed to update apartment");
    }

    return res.json();
};

export const deleteApartment = async (id, token) => {
    const res = await fetch(`${productApi}/apartment/update_apartment/${id}/`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) {
        throw new Error("Failed to delete apartment");
    }

    return res.json();
};
