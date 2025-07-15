'use client'

import styles from './page.module.scss'
import {useRouter} from "next/navigation";
import getCookie from "@/uttils/getCookie/getCookie";
import {useEffect, useState} from "react";
import getApartment from "@/api/apartmentsApi";
import ApartmentListItem from "@/components/HotelListItem/HotelListItem";

const Apartments = () => {
    const router = useRouter()
    const [apartments, setApartments] = useState([])

    useEffect(() => {
        const token = getCookie('access_token');
        if (!token) {
            router.push('/login');
            return;
        }

        const fetchApartments = async () => {
            try {
                const data = await getApartment(token);
                console.log('Apartments data:', data);
                return data;
            } catch (error) {
                console.error('Failed to fetch apartments:', error);
            }
        };

        fetchApartments().then(data => {
            if (data) setApartments(data);
        });
    }, []);


    return (
        <>
            <div className={styles.container}>
                <div className={styles.layout}>
                    <main className={styles.main}>
                        {apartments.map(apartment => (
                            <ApartmentListItem
                                key={apartment.id}
                                id={apartment.id}
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
