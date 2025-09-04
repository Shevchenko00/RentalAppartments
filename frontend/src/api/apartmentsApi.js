import {fetchNewToken} from "@/api/auth";

const productApi = process.env.NEXT_PUBLIC_PRODUCTS_;
import getCookie from "@/uttils/getCookie/getCookie";


export const getApartment = async (token, page = 1) => {
    const res = await fetch(
        `${productApi}/apartment/?page=${page}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    if (!res.ok) throw { status: res.status };
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
    minRooms,
    maxRooms,
    city,
    token
) => {
    const params = new URLSearchParams();
    if (minPrice) params.append("min_price", minPrice);
    if (maxPrice) params.append("max_price", maxPrice);
    if (minRooms) params.append("min_rooms", minRooms);
    if (maxRooms) params.append("max_rooms", maxRooms);
    if (city) params.append("city", city);

    const res = await fetch(`${productApi}/apartment/?${params.toString()}`, {
        cache: "no-store",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error(`Loading error: ${res.status}`);
    }

    return await res.json();
};


export const getMyApartments = async (token, page = 1) => {
    const res = await fetch(`${productApi}/apartment/my_apartments/?page=${page}`, {
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
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: data,
    }).then(res => {
        if (!res.ok) throw new Error("Failed to update apartment");
        return res.json();
    });
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

    if (res.status === 204 ) {
        return null;
    }
    return res.json();
};



export const createApartment = async (data, token) => {
    const response = await fetch(`${productApi}/apartment/create_apartment/`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: data,
    }).then(res => {
        if (!res.ok) throw new Error("Failed to create apartment");
        return res.json();
    });
};
