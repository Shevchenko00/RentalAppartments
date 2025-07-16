const productApi = process.env.NEXT_PUBLIC_PRODUCTS_;

export const getApartment = async (token) => {
    const res = await fetch(`${productApi}/apartment/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (res.status === 401) {
        return null; // <-- возвращаем null при 401
    }

    if (!res.ok) {
        return null; // или можно throw Error, зависит от твоей логики
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

    if (res.status === 401 || !res.ok) {
        return null;
    }

    return res.json();
};
