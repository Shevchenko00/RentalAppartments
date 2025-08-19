'use client'

import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {fetchApartment, updateApartment, deleteApartment} from "@/api/apartmentsApi"; // 👈 добавим апи
import {getUserByToken} from "@/api/userApi";
import getCookie from "@/uttils/getCookie/getCookie";
import * as styles from './page.module.scss'

const ApartmentEdit = () => {
    const [apartment, setApartment] = useState(null);
    const [userId, setUserId] = useState();
    const [ownerId, setOwnerId] = useState();
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const router = useRouter();
    const accessToken = getCookie("access_token");

    useEffect(() => {
        fetchApartment(
            params?.id,
            router,
            (data) => {
                setApartment(data);
                setOwnerId(data.landlord?.id);
            },
            setLoading
        );

        getUserByToken(accessToken).then((res) => {
            setUserId(res);
        });
    }, []);

    if (loading) return <p className={styles.loading}>Загрузка...</p>;

    if (userId?.user_id !== ownerId) {
        return <h1 className={styles.forbidden}>Нет доступа</h1>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const updatedApartment = {
            title: formData.get("title"),
            description: formData.get("description"),
            city: formData.get("city"),
            street: formData.get("street"),
            price: formData.get("price"),
            count_room: formData.get("count_room"),
            apartment_type: formData.get("apartment_type")
        };

        try {
            await updateApartment(params.id, updatedApartment, accessToken); // 👈 PUT запрос
            alert("Apartment updated successfully!");
            router.push(`/apartments/${params.id}`);
        } catch (err) {
            console.error(err);
            alert("Ошибка при сохранении");
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this apartment?")) return;
        try {
            await deleteApartment(params.id, accessToken); // 👈 DELETE запрос
            alert("Apartment deleted");
            router.push("/");
        } catch (err) {
            console.error(err);
            alert("Ошибка при удалении");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Редактирование квартиры</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Title
                    <input
                        className={styles.input}
                        type="text"
                        name="title"
                        defaultValue={apartment?.title}
                    />
                </label>

                <label className={styles.label}>
                    Description
                    <textarea
                        className={styles.textarea}
                        name="description"
                        defaultValue={apartment?.description}
                    />
                </label>

                <div className={styles.row}>
                    <label className={styles.label}>
                        City
                        <input
                            className={styles.input}
                            type="text"
                            name="city"
                            defaultValue={apartment?.city}
                        />
                    </label>
                    <label className={styles.label}>
                        Address
                        <input
                            className={styles.input}
                            type="text"
                            name="street"
                            defaultValue={apartment?.street}
                        />
                    </label>
                </div>

                <div className={styles.row}>
                    <label className={styles.label}>
                        Price
                        <input
                            className={styles.input}
                            type="number"
                            name="price"
                            defaultValue={apartment?.price}
                        />
                    </label>

                    <label className={styles.label}>
                        Count of rooms
                        <input
                            className={styles.input}
                            type="number"
                            name="count_room"
                            defaultValue={apartment?.count_room}
                        />
                    </label>
                </div>

                <label className={styles.label}>
                    Type of apartment
                    <input
                        className={styles.input}
                        type="text"
                        name="apartment_type"
                        defaultValue={apartment?.apartment_type}
                    />
                </label>

                <div className={styles.actions}>
                    <button type="submit" className={styles.saveBtn}>
                        Save
                    </button>
                    <button
                        type="button"
                        className={styles.cancelBtn}
                        onClick={() => router.push(`/apartments/${params?.id}`)}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className={styles.deleteBtn}
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ApartmentEdit;
