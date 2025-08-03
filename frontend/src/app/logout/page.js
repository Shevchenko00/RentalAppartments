'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            document.cookie = "access_token=; path=/; max-age=0";
            router.push('/login');
        };

        logout();
    }, [router]);

    return <>
    </>;
}