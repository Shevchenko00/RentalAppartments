'use client'

import styles from './page.module.scss'
import {useRouter} from "next/navigation";
import getCookie from "@/uttils/getCookie/getCookie";
import {useEffect, useState} from "react";
import {getApartment} from "@/api/apartmentsApi";
import ApartmentListItem from "@/components/HotelListItem/ApartmentListItem";
import AnimatedSection from "@/components/AnimateSection/AnimateSection";
import {fetchNewToken} from "@/api/auth";

const Apartments = () => {
    const router = useRouter()
    const [apartments, setApartments] = useState([])

    useEffect(() => {
        const accessToken = getCookie('access_token');
        const refreshToken = getCookie('refresh_token')
        const fetchApartments = async () => {
            try {
                const data = await getApartment(accessToken);
                setApartments(data);
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
                <AnimatedSection>
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
                </AnimatedSection>
            </div>
        </>
    )
}
export default Apartments;
