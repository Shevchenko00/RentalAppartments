'use client'

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchApartment, updateApartment, deleteApartment } from "@/api/apartmentsApi";
import { getUserByToken } from "@/api/userApi";
import getCookie from "@/uttils/getCookie/getCookie";
import * as styles from './page.module.scss'
import Modal from "@/components/Modal/Modal";
import Loader from "@/components/Loader/Loader";

const defaultModal = { open: false, message: "", confirmMode: false, onConfirm: null, onClose: null };

const ApartmentEdit = () => {
    const [apartment, setApartment] = useState(null);
    const [userId, setUserId] = useState();
    const [ownerId, setOwnerId] = useState();
    const [loading, setLoading] = useState(true);

    const [modal, setModal] = useState(defaultModal);

    const params = useParams();
    const router = useRouter();
    const accessToken = getCookie("access_token");

    // --- модалки ---
    const closeModal = () => setModal(defaultModal);
    const openOk = (message, onOk) =>
        setModal({ open: true, message, confirmMode: false, onConfirm: onOk || closeModal, onClose: null });
    const openConfirm = (message, onYes, onNo = closeModal) =>
        setModal({ open: true, message, confirmMode: true, onConfirm: onYes, onClose: onNo });

    // --- загрузка данных ---
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

        getUserByToken(accessToken).then((res) => setUserId(res));
    }, []);

    if (loading) return <Loader />;

    if (!loading && userId && ownerId && userId.user_id !== ownerId) {
        router.push('/apartments');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("title", e.target.title.value);
        formData.append("description", e.target.description.value);
        formData.append("city", e.target.city.value);
        formData.append("street", e.target.street.value);
        formData.append("price", e.target.price.value);
        formData.append("count_room", e.target.count_room.value);
        formData.append("apartment_type", e.target.apartment_type.value);

        const files = e.target.photos.files;
        for (let i = 0; i < files.length; i++) {
            formData.append("photos", files[i]);
        }



        try {
            await updateApartment(params.id, formData, accessToken);
            openOk("Apartment updated successfully!", () =>
                router.push(`/apartments/${params.id}`)
            );
        } catch (err) {
            console.error(err);
            openOk("Unknown error while saving");
        }
    };

    const handleDelete = () => {
        openConfirm(
            "Are you sure you want to delete this apartment?",
            async () => {
                try {
                    await deleteApartment(params.id, accessToken);
                    openOk("Apartment deleted", () => router.push("/profile"));
                } catch (err) {
                    console.error(err);
                    openOk("Unknown error");
                }
            }
        );
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Apartment Edit</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                {/* Фото */}
                <label className={styles.label}>
                    Photos
                    <input
                        className={styles.input}
                        type="file"
                        name="photos"
                        accept="image/*"
                        multiple
                    />
                </label>

                {/* Заголовок */}
                <label className={styles.label}>
                    Title
                    <input
                        className={styles.input}
                        type="text"
                        name="title"
                        defaultValue={apartment?.title}
                    />
                </label>

                {/* Описание */}
                <label className={styles.label}>
                    Description
                    <textarea
                        className={styles.textarea}
                        name="description"
                        defaultValue={apartment?.description}
                    />
                </label>

                {/* Город + улица */}
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

                {/* Цена + количество комнат */}
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

                {/* Тип квартиры */}
                <label className={styles.label}>
                    Type of apartment
                    <input
                        className={styles.input}
                        type="text"
                        name="apartment_type"
                        defaultValue={apartment?.apartment_type}
                    />
                </label>

                {/* Кнопки */}
                <div className={styles.actions}>
                    <button type="submit" className={styles.saveBtn}>Save</button>
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

            {/* Модалка */}
            {modal.open && (
                <Modal
                    message={modal.message}
                    confirmMode={modal.confirmMode}
                    onConfirm={modal.onConfirm}
                    onClose={modal.onClose || closeModal}
                />
            )}
        </div>
    );
};

export default ApartmentEdit;
