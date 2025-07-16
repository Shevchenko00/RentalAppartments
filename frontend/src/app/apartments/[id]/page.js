'use client'

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getApartmentById } from '@/api/apartmentsApi';
import getCookie from '@/uttils/getCookie/getCookie';
import styles from './page.module.scss'
const ApartmentDetailPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [apartment, setApartment] = useState(null);

    useEffect(() => {
        const fetchApartment = async () => {
            const token = getCookie('access_token');

            try {
                const data = await getApartmentById(id, token);
                setApartment(data);
            } catch (error) {
                if (error.status === 401) {
                    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                    router.push('/login');
                } else {
                    console.error('Failed to fetch apartment:', error);
                }
            }
        };

        fetchApartment();
    }, [id, router]);


    if (!apartment) return <p>Apartment not found.</p>;

    return (
        <>
            <div className={styles.container}>
            <h1>{apartment.title}</h1>
            <img
                src={apartment.photo}
                alt={apartment.title}
            />
            <p><strong>Price:</strong> ${apartment.price}</p>
            <p><strong>Description:</strong> {apartment.description}</p>
            <p><strong>City:</strong> {apartment.city}</p>
            <p><strong>Street:</strong> {apartment.street}</p>
            <p><strong>Apartment type:</strong> {apartment.apartment_type}</p>
            <p><strong>Count of room:</strong> {apartment.count_room}</p>
            </div>
        </>
    );
};

export default ApartmentDetailPage;
