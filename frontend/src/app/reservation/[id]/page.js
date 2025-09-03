'use client'
import {getUserByToken} from "@/api/userApi";

const productApi = process.env.NEXT_PUBLIC_PRODUCTS_;

import {useParams, useRouter} from "next/navigation";
import * as styles from "./page.module.scss";
import Loader from "@/components/Loader/Loader";
import Modal from "@/components/Modal/Modal";
import {useEffect, useState} from "react";
import getCookie from "@/uttils/getCookie/getCookie";
import {createReservation} from "@/api/reservationApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const defaultModal = { open: false, message: "", confirmMode: false, onConfirm: null, onClose: null };

const Reservation = () => {
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(defaultModal);

    const [reservations, setReservations] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [userId, setUserId] = useState();

    const router = useRouter();
    const params = useParams();
    const accessToken = getCookie("access_token");

    const closeModal = () => setModal(defaultModal);
    const openOk = (message, onOk) =>
        setModal({ open: true, message, confirmMode: false, onConfirm: onOk || closeModal, onClose: null });

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const res = await fetch(`${productApi}/reservations/booked_date/${params.id}/`);
                const data = await res.json();
                setReservations(data.results || []);
            } catch (err) {
                console.error("Error loading reservations:", err);
            }
        };
        fetchReservations();
        getUserByToken(accessToken).then((res) => setUserId(res));

    }, [params.id]);

    const bookedDates = reservations.flatMap(res => {
        const start = new Date(res.start_date);
        const end = new Date(res.end_date);
        const dates = [];
        let d = new Date(start);
        while (d <= end) {
            dates.push(new Date(d));
            d.setDate(d.getDate() + 1);
        }
        return dates;
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = {
            start_date: startDate?.toISOString().split("T")[0],
            end_date: endDate?.toISOString().split("T")[0],
            guests: e.target.guests.value,
            comment: e.target.comment.value,
        };

        try {
            await createReservation(params.id, formData, accessToken);
            openOk("Reservation created successfully!", () =>
                router.push(`/apartments/${params.id}`)
            );
        } catch (err) {
            console.error(err);
            if (err.status === 400) {
                openOk("Error: selected dates are unavailable or invalid");
            } else {
                openOk("Unknown error while creating reservation");
            }
        } finally {
            setLoading(false);
        }
    };
    if (loading) return <Loader />;

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>New Reservation</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Select Dates
                    <DatePicker
                        selected={startDate}
                        onChange={(dates) => {
                            const [start, end] = dates;
                            setStartDate(start);
                            setEndDate(end);
                        }}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        inline
                        excludeDates={bookedDates}
                        minDate={new Date()}
                        monthsShown={2}
                        dateFormat="MM/dd/yyyy"
                        dayClassName={(date) =>
                            bookedDates.some(d => d.toDateString() === date.toDateString())
                                ? styles.bookedDay
                                : undefined
                        }
                    />
                </label>

                {startDate && endDate && (
                    <p className={styles.selectedDates}>
                        Selected: {startDate.toLocaleDateString()} — {endDate.toLocaleDateString()}
                    </p>
                )}

                <label className={styles.label}>
                    Guests
                    <input
                        className={styles.input}
                        type="number"
                        name="guests"
                        min="1"
                        defaultValue="1"
                    />
                </label>

                <label className={styles.label}>
                    Comment
                    <textarea
                        className={styles.textarea}
                        name="comment"
                        placeholder="Any notes for the host..."
                    />
                </label>

                <div className={styles.actions}>
                    <button type="submit" className={styles.saveBtn}>Reserve</button>
                    <button
                        type="button"
                        className={styles.cancelBtn}
                        onClick={() => router.push(`/apartments/${params.id}`)}
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
                    onClose={modal.onClose || closeModal}
                />
            )}
        </div>
    );
};

export default Reservation;