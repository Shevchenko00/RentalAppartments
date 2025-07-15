const productApi = process.env.NEXT_PUBLIC_PRODUCTS_



const getApartment = async (token) => {
    const response = await fetch(`${productApi}/apartment/`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Error getting Tasks');
    }

    return await response.json();
}

export default getApartment;