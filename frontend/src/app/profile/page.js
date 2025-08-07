'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getCookie from "@/uttils/getCookie/getCookie";
import { getUserById, getUserByToken } from "@/api/userApi";
import styles from './page.module.scss';
import {fetchNewToken} from "@/api/auth";

const Profile = () => {
    const router = useRouter();
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            const token = getCookie('access_token');
            const refreshToken = getCookie('refresh_token')
            try {
                const data = await getUserByToken(token);
                setUserId(data.user_id);
            } catch (error) {
                if (error.status === 401) {
                    try{
                        await fetchNewToken(refreshToken)
                    } catch (error) {
                        if (error.status === 422 || error.status === 401) {
                            router.push('/login');
                            document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                        }
                    }
                }
            }
        };

        fetchUserId();
    }, [router]);

    useEffect(() => {
        const fetchUserById = async () => {
            if (!userId) return;

            try {
                const data = await getUserById(userId);
                setUser(data);
            } catch (error) {
                console.error('Fetch user error:', error);
                if (error.status === 401) {
                    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                    router.push('/login');
                }
            }
        };

        fetchUserById();
    }, [userId, router]);

    if (!user) return <p>Loading...</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>User Profile</h1>
            <p className={styles.infoItem}><strong>ID:</strong> {user.id}</p>
            <p className={styles.infoItem}><strong>Name:</strong> {user.first_name} {user.last_name}</p>
            <p className={styles.infoItem}><strong>Email:</strong> {user.email}</p>
            <p className={styles.infoItem}><strong>Phone:</strong> {user.phone_number}</p>
        </div>
    );
};

export default Profile;
