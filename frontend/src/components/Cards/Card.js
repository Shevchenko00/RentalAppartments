'use client';
import React from 'react';
import styles from './Cards.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const Card = () => {
    const people = [
        {
            name: 'John Doe',
            image: '/images/feedbacks/feedback1.jpg',
            description: 'The stay was amazing! The staff made me feel at home.',
        },
        {
            name: 'Emily Smith',
            image: '/images/feedbacks/feedback2.jpg',
            description: 'I loved the comfort and attention to detail in every room.',
        },
        {
            name: 'Mary Muller',
            image: '/images/feedbacks/feedback3.jpg',
            description: 'Best hotel experience I’ve had in years!',
        },
        {
            name: 'Robert Grey',
            image: '/images/feedbacks/feedback4.jpg',
            description: 'Very peaceful, clean, and cozy. Will definitely return.',
        },
        {
            name: 'Inna Schade',
            image: '/images/feedbacks/feedback5.jpg',
            description: 'Excellent value for money and lovely staff!',
        },
    ];

    return (
        <div className={styles.carousel_wrapper}>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                speed={1000} // 👈 скорость анимации в миллисекундах (1 секунда)
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true, // 👈 остановка при наведении
                }}
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
            {people.map((person, index) => (
                    <SwiperSlide key={index}>
                        <div className={styles.card}>
                            <div className={styles.person_info}>
                                <img
                                    src={person.image}
                                    alt={person.name}
                                    className={styles.person_image}
                                />
                                <h2 className={styles.person_name}>{person.name}</h2>
                            </div>
                            <p className={styles.description}>{person.description}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Card;
