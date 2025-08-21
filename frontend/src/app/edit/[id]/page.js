'use client'

import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {fetchApartment, updateApartment, deleteApartment} from "@/api/apartmentsApi";
import {getUserByToken} from "@/api/userApi";
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

    const closeModal = () => setModal(defaultModal);
    const openOk = (message, onOk) =>
        setModal({ open: true, message, confirmMode: false, onConfirm: onOk || closeModal, onClose: null });
    const openConfirm = (message, onYes, onNo = closeModal) =>
        setModal({ open: true, message, confirmMode: true, onConfirm: onYes, onClose: onNo });

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

    if (loading) return <Loader/>;


    if (userId?.user_id !== ownerId) {
        return router.push('/apartments');
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
            await updateApartment(params.id, updatedApartment, accessToken);
            openOk("Apartment updated successfully!", () => router.push(`/apartments/${params.id}`));
        } catch (err) {
            console.error(err);
            openOk("Unknown error while save");
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
                <label className={styles.label}>
                    Title
                    <input className={styles.input} type="text" name="title" defaultValue={apartment?.title} />
                </label>

                <label className={styles.label}>
                    Description
                    <textarea className={styles.textarea} name="description" defaultValue={apartment?.description} />
                </label>

                <div className={styles.row}>
                    <label className={styles.label}>
                        City
                        <input className={styles.input} type="text" name="city" defaultValue={apartment?.city} />
                    </label>
                    <label className={styles.label}>
                        Address
                        <input className={styles.input} type="text" name="street" defaultValue={apartment?.street} />
                    </label>
                </div>

                <div className={styles.row}>
                    <label className={styles.label}>
                        Price
                        <input className={styles.input} type="number" name="price" defaultValue={apartment?.price} />
                    </label>
                    <label className={styles.label}>
                        Count of rooms
                        <input className={styles.input} type="number" name="count_room" defaultValue={apartment?.count_room} />
                    </label>
                </div>

                <label className={styles.label}>
                    Type of apartment
                    <input className={styles.input} type="text" name="apartment_type" defaultValue={apartment?.apartment_type} />
                </label>

                <div className={styles.actions}>
                    <button type="submit" className={styles.saveBtn}>Save</button>
                    <button type="button" className={styles.cancelBtn} onClick={() => router.push(`/apartments/${params?.id}`)}>
                        Cancel
                    </button>
                    <button type="button" className={styles.deleteBtn} onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </form>

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
