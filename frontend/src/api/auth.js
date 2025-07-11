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
