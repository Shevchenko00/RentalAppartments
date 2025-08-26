'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as styles from "@/app/edit/[id]/page.module.scss";
import Modal from "@/components/Modal/Modal";
import {createApartment, updateApartment} from "@/api/apartmentsApi";
import getCookie from "@/uttils/getCookie/getCookie";

const CreateNewApartment = () => {
    const router = useRouter();
    const [modal, setModal] = useState({ open: false, message: '', confirmMode: false, onConfirm: null });
    const accessToken = getCookie("access_token");

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
        formData.append("is_active", e.target.is_active.checked ? "true" : "false");


        const files = e.target.photos.files;
        console.log(files.length)
        for (let i = 0; i < files.length; i++) {
            formData.append("photos", files[i]);
        }

        try {
            await createApartment(formData, accessToken);
                router.push(`/profile`)
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Create New Apartment</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
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

                <label className={styles.label}>
                    Title
                    <input
                        className={styles.input}
                        type="text"
                        name="title"
                        required
                    />
                </label>

                <label className={styles.label}>
                    Description
                    <textarea
                        className={styles.textarea}
                        name="description"
                        required
                    />
                </label>

                <div className={styles.row}>
                    <label className={styles.label}>
                        City
                        <input
                            className={styles.input}
                            type="text"
                            name="city"
                            required
                        />
                    </label>
                    <label className={styles.label}>
                        Address
                        <input
                            className={styles.input}
                            type="text"
                            name="street"
                            required
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
                            required
                        />
                    </label>
                    <label className={styles.label}>
                        Count of rooms
                        <input
                            className={styles.input}
                            type="number"
                            name="count_room"
                            required
                        />
                    </label>
                </div>

                <label className={styles.label}>
                    Type of apartment
                    <input
                        className={styles.input}
                        type="text"
                        name="apartment_type"
                        required
                    />
                </label>

                <label className={styles.label}>
                    Active
                    <input
                        className={styles.input}
                        type="checkbox"
                        name="is_active"
                        defaultChecked={true}
                    />
                </label>

                <div className={styles.actions}>
                    <button type="submit" className={styles.saveBtn}>Save</button>
                    <button
                        type="button"
                        className={styles.cancelBtn}
                        onClick={() => router.push('/apartments')}
                    >
                        Cancel
                    </button>
                </div>
            </form>

            {modal.open && (
                <Modal
                    message={modal.message}
                    confirmMode={modal.confirmMode}
                    onConfirm={modal.onConfirm}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default CreateNewApartment;
