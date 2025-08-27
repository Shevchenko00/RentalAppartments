'use client'

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import getCookie from "@/uttils/getCookie/getCookie";
import {getUserById, getUserByToken} from "@/api/userApi";
import styles from './page.module.scss';
import {fetchNewToken} from "@/api/auth";
import {useLoading} from "@/hooks/useLoader";
import Loader from "@/components/Loader/Loader";
import {getMyApartments} from "@/api/apartmentsApi";
import Button from "@/components/Button/Button";

const Profile = () => {
    const router = useRouter();
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const {loading, setLoading} = useLoading();
    const [apartments, setApartments] = useState([])
    const token = getCookie('access_token');
    const refreshToken = getCookie('refresh_token')
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [next, setNext] = useState(null);
    const [previous, setPrevious] = useState(null);



    useEffect(() => {
        const fetchUserId = async () => {
            setLoading(true);
            try {
                const data = await getUserByToken(token);
                setUserId(data.user_id);
            } catch (error) {
                if (error.status === 401) {
                    try {
                        await fetchNewToken(refreshToken);
                        const newData = await getUserByToken(getCookie('access_token'));
                        setUserId(newData.user_id);
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

        fetchUserId();
    }, [router, setLoading]);

    useEffect(() => {
        // функция для загрузки данных
        const fetchUserByIdData = async () => {
            if (!userId) return; // если userId ещё нет — выходим

            try {
                // Получаем пользователя
                const data = await getUserById(userId);
                setUser(data);

                // Получаем квартиры с пагинацией
                const apartmentsData = await getMyApartments(token, page);
                setApartments(apartmentsData.results); // всегда перезаписываем
                setCount(apartmentsData.count);
                setNext(apartmentsData.next);
                setPrevious(apartmentsData.previous);
            } catch (error) {
                // при ошибке сбрасываем токены и редиректим
                document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                router.push('/login');
            }
        };

        fetchUserByIdData();
    }, [userId, page, router]); // только константные зависимости



    useEffect(() => {
        const timer = setTimeout(() => {
            if (!loading && (!user || !user.id)) {
                router.push('/login');
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [loading, user, router]);


    if (loading) return <Loader/>;

    if (!user || !user.id) return null;

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.title}>User Profile</h1>
                <p className={styles.infoItem}><strong>ID:</strong> {user.id}</p>
                <p className={styles.infoItem}><strong>Name:</strong> {user.first_name} {user.last_name}</p>
                <p className={styles.infoItem}><strong>Email:</strong> {user.email}</p>
                <p className={styles.infoItem}><strong>Phone:</strong> {user.phone_number}</p>
                <h1 className={styles.title}>My listings</h1>

                <div className={styles.publications}>
                    {apartments.length ? apartments.map((apartments) => (
                        <div key={apartments.id} className={styles.publicationCard}>
                            <div className={styles.cardImage}>
                                {apartments.title_photo !== null ?
                                    <img src={apartments.title_photo} alt={apartments.title} /> :
                                    <img src={apartments.photos[0]?.photo} alt={apartments.title}/>
                            }

                        </div>
                            <h3>{apartments.title}</h3>
                            <p>{apartments.description}</p>
                            <div className={styles.actions}>
                                <Button onclick={() => router.push(`/edit/${apartments.id}`)} text={'edit'} />
                            </div>
                            {/*<Button onclick={() => router.push(`/edit/${apartments.id}`)} text={'edit'} />*/}
                        </div>
                    )) :<div className={styles.noListing}>
                        You don't have any listings
                        <Button
                            onclick={() => window.open('/createNewApartment/', '_blank')}
                            text="Create new"
                        />
                    </div>
                    }

                </div>
                <div className={styles.pagination}>
                    <button
                        disabled={!previous}
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                    >
                        Prev
                    </button>

                    <span>{page} / {Math.ceil(count / 10)}</span>

                    <button
                        disabled={!next}
                        onClick={() => setPage(p => p + 1)}
                    >
                        Next
                    </button>
                </div>
                <div className={styles.noListing}>
                    <Button
                        onclick={() => window.open('/createNewApartment/', '_blank')}
                        text="Create new"
                    />
                </div>
            </div>
        </>
    );
}


export default Profile;
