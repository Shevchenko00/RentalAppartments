'use client';

import {useEffect, useState} from 'react';
import {useParams, useRouter} from 'next/navigation';
import {fetchApartment} from '@/api/apartmentsApi';
import styles from './page.module.scss';
import Loader from "@/components/Loader/Loader";
import {useLoading} from "@/hooks/useLoader";
import Button from "@/components/Button/Button";
import Slider from "react-slick";
import {getUserByToken} from "@/api/userApi";
import getCookie from "@/uttils/getCookie/getCookie";

const ApartmentDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const [apartment, setApartment] = useState(null);
    const {loading, setLoading} = useLoading();
    const [reviews, setReviews] = useState([]);
    const accessToken = getCookie('access_token')
    const [userId, setUserId] = useState()


    useEffect(() => {
        fetchApartment(params?.id, router, setApartment, setLoading);

        getUserByToken(accessToken).then(r => setUserId(r.user_id));
    }, [params?.id, router, accessToken]);

    useEffect(() => {
        console.log("apartment:", apartment);
        console.log("userId:", userId, typeof userId);
        console.log("landlordId:", apartment?.landlord?.id, typeof apartment?.landlord?.id);

        if (apartment && userId && userId === apartment?.landlord?.id) {
            console.log('✅ Пользователь = владелец квартиры');
        } else {
            console.log('❌ Условие не выполнено');
        }
    }, [apartment, userId]);


    if (loading && !userId) return <Loader/>;
    if (!apartment) return <p>Apartment not found.</p>;

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true
    };

    return (
        <div className={styles.container}>
            <div className={styles.layout}>
                <div className={styles.imageBlock}>
                    {apartment.title_photo || (apartment.photos && apartment.photos.length > 0) ? (
                        <Slider {...sliderSettings}>
                            {apartment.title_photo && (
                                <div className={styles.slide}>
                                    <img src={apartment.title_photo} alt={`${apartment.title} - main`} />
                                </div>
                            )}

                            {apartment.photos?.map((photo, index) => (
                                <div key={index} className={styles.slide}>
                                    <img src={photo.photo} alt={`${apartment.title} - ${index+1}`} />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <img src="/images/no-image.png" alt="No image available" />
                    )}
                </div>


                <div className={styles.infoBlock}>
                    <h1>{apartment.title}</h1>
                    <p><strong>Price:</strong> ${apartment.price}</p>
                    <p><strong>Description:</strong> {apartment.description}</p>
                    <p><strong>City:</strong> {apartment.city}</p>
                    <p><strong>Street:</strong> {apartment.street}</p>
                    <p><strong>Apartment type:</strong> {apartment.apartment_type}</p>
                    <p><strong>Count of room:</strong> {apartment.count_room}</p>
                </div>
            </div>

            <div className={styles.landlordBlock}>
                <div className={styles.iconWrapper}>
                    <img src="/images/profileIcon.jpg" alt="icon" width={"94"} height={"94"}/>
                </div>
                <div className={styles.infoWrapper}>
                    <p><strong>Landlord:</strong> {apartment.landlord.first_name} {apartment.landlord.last_name}</p>
                    <p><strong>Phone:</strong> <a href={`tel:${apartment.landlord.phone_number}`}>{apartment.landlord.phone_number}</a></p>
                    <p><strong>Email:</strong> <a href={`mailto:${apartment.landlord.email}`}>{apartment.landlord.email}</a></p>
                </div>
            </div>

            <div className={styles.reviewsBlock}>
                <h2>Reviews</h2>
                {reviews && reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review.id} className={styles.reviewItem}>
                            <h3>{review.title}</h3>
                            <p>{review.text}</p>
                            <div className={styles.reviewerName}>— {review.author}</div>
                        </div>
                    ))
                ) : (
                    <h3>This apartment does not have any reviews.</h3>
                )}
            </div>

            { userId === apartment?.landlord?.id? (
                <Button text={'Edit'} type={'submit'} onclick={() => router.push(`/edit/${params?.id}`)} />
                         ) : (
                <Button text={'Book now'} type={'submit'} onclick={() => router.push(`/reservation/${params?.id}`)} />

                )


            }
        </div>
    )
}

export default ApartmentDetailPage;
