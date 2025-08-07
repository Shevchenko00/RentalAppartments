const authUrl = process.env.NEXT_PUBLIC_API_AUTH

export async function loginUser({email, password}) {
    const res = await fetch(`${authUrl}/login/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password}),
    });
    console.log('fetch finished');

    const data = await res.json();
    if (!res.ok) throw data;
    return data;
}

export async function registerUser({
                                       email,
                                       password,
                                       repeat_password,
                                       country,
                                       phone_country_code,
                                       phone_number,
                                       city,
                                       first_name,
                                       last_name,
                                       date_birth,
                                       is_landlord
                                   }) {
    const res = await fetch(`${authUrl}/register/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email,
            first_name,
            password,
            repeat_password,
            country,
            phone_country_code,
            phone_number,
            city,
            last_name,
            date_birth,
            is_landlord
        }),
    });

    const data = await res.json();
    if (!res.ok) throw data;
    return data;
}


export const fetchNewToken = async (refresh_token) => {
    const res = await fetch(`${authUrl}/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-store',
        body: JSON.stringify({
            refresh_token: refresh_token
        })
    });

    if (!res.ok) {
        const error = new Error('Failed to fetch user');
        error.status = res.status;
        throw error;
    }

    const data = await res.json();

    document.cookie = `access_token=${data.access_token}; path=/; secure; samesite=lax; max-age=3600`;
    window.location.reload();
    return data;
}

