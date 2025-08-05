'use client'

import styles from './page.module.scss'
import {useRouter} from "next/navigation";
import getCookie from "@/uttils/getCookie/getCookie";
import {useEffect, useState} from "react";
import {getApartment} from "@/api/apartmentsApi";
import ApartmentListItem from "@/components/HotelListItem/ApartmentListItem";

const Apartments = () => {
    const router = useRouter()
    const [apartments, setApartments] = useState([])

    useEffect(() => {
        const token = getCookie('access_token');

        const fetchApartments = async () => {
            try {
                const data = await getApartment(token);
                setApartments(data);
            } catch (error) {
                if (error.status === 401) {
                    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                    router.push('/login');
                } else {
                    console.error('Failed to fetch apartments:', error);
                }
            }
        };

        fetchApartments();
        console.log(apartments);

    }, [router]);


    return (
        <>
            <div className={styles.container}>
                <div className={styles.layout}>
                    <main className={styles.main}>
                        {apartments.map(apartment => (
                            <ApartmentListItem
                                key={apartment.id}
                                id={apartment.id}
                                img={apartment.photo}
                                title={apartment.title}
                                price={apartment.price}
                                description={apartment.description}
                            />
                            )
                        )}

                    </main>
                    <aside className={styles.sidebar}>
                        <div className={styles.filter}>
                            <h1>Price</h1>
                            <div className={styles.inputs}>
                                <input placeholder="min" />
                                <input placeholder="max" />
                            </div>

                        </div>
                        <div className={styles.filter}>
                            <h1>Number of rooms</h1>
                            <div className={styles.inputs}>
                                <input placeholder="min" />
                                <input placeholder="max" />
                            </div>

                        </div>
                        <div className={styles.filter}>
                            <h1>Location</h1>
                            <div className={styles.inputs}>
                                <input placeholder="min" />
                                <input placeholder="max" />
                            </div>
                        </div>
                        <button className={styles.btn} type={'submit'}>Apply</button>
                    </aside>
                </div>
            </div>
        </>
    )
}
export default Apartments;
