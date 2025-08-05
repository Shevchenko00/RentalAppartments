const authUrl = process.env.NEXT_PUBLIC_API_AUTH
const productApi = process.env.NEXT_PUBLIC_PRODUCTS_;

export const getUserByToken = async (token) => {
    const res = await fetch(`${productApi}/apartment/api/user/id/`, {
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const error = new Error('Failed to fetch user');
        error.status = res.status;
        throw error;
    }

    return res.json();
};


export const getUserById = async (id) => {
    const res = await fetch(`${authUrl}/users/${id}`, {
        cache: 'no-store',
        // headers: {
        //     Authorization: `Bearer ${token}`,
        // },
    });

    if (!res.ok) {
        const error = new Error('Failed to fetch user');
        (error).status = res.status;
        throw error;
    }

    return res.json();
};