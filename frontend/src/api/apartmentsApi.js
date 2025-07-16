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
