'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getApartmentById } from '@/api/apartmentsApi';
import getCookie from '@/uttils/getCookie/getCookie';
import styles from './page.module.scss';

const ApartmentDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const [apartment, setApartment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApartment = async () => {
            const token = getCookie('access_token');
            const id = params?.id;

            if (!id) {
                console.warn('ID is missing in URL');
                router.push('/');
                return;
            }

            try {
                const data = await getApartmentById(id, token);
                setApartment(data);
            } catch (error) {
                const status = error?.status || error?.response?.status;

                if (status === 401) {
                    router.push('/logout');
                } else {
                    console.error('Failed to fetch apartment:', error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchApartment();
    }, [params, router]);

    if (loading) return <p>Loading apartment...</p>;
    if (!apartment) return <p>Apartment not found.</p>;

    return (
        <div className={styles.container}>
            <div className={styles.layout}>
                <div className={styles.imageBlock}>
                    <img src={apartment.photo} alt={apartment.title} />
                </div>

                <div className={styles.infoBlock}>
                    <h1>{apartment.title}</h1>
                    <p>
                        <strong>Price:</strong> ${apartment.price}
                    </p>
                    <p>
                        <strong>Description:</strong> {apartment.description}
                    </p>
                    <p>
                        <strong>City:</strong> {apartment.city}
                    </p>
                    <p>
                        <strong>Street:</strong> {apartment.street}
                    </p>
                    <p>
                        <strong>Apartment type:</strong> {apartment.apartment_type}
                    </p>
                    <p>
                        <strong>Count of room:</strong> {apartment.count_room}
                    </p>
                </div>

            </div>
            <div className={styles.landlordBlock}>
                <div className={styles.iconWrapper}>
                    <img src="/images/profileIcon.jpg" alt="icon" width={"94"} height={"94"} />
                </div>
                <div className={styles.infoWrapper}>
                    <p>
                        <strong>Landlord:</strong> {apartment.landlord.first_name} {apartment.landlord.last_name}
                    </p>
                    <p>
                        <strong>Phone:</strong> <a href={`tel:${apartment.landlord.phone_number}`}>{apartment.landlord.phone_number}</a>
                    </p>
                    <p>
                        <strong>Email:</strong> <a href={`mailto:${apartment.landlord.email}`}>{apartment.landlord.email}</a>
                    </p>
                </div>
            </div>
        </div>

    )
}

    export default ApartmentDetailPage;
