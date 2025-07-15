const productApi = process.env.NEXT_PUBLIC_PRODUCTS_


const getHotels = async (token) => {
    const response = await fetch(`${productApi}/tasks/`, {
        method: 'GET',
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