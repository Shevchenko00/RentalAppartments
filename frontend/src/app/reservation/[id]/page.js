'use client'
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as styles from "./page.module.scss";

import { getUserByToken } from "@/api/userApi";
import { createReservation } from "@/api/reservationApi";
import { fetchApartment } from "@/api/apartmentsApi";

import getCookie from "@/uttils/getCookie/getCookie";
import Loader from "@/components/Loader/Loader";
import Modal from "@/components/Modal/Modal";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const productApi = process.env.NEXT_PUBLIC_PRODUCTS_;
const defaultModal = { open: false, message: "", confirmMode: false, onConfirm: null, onClose: null };

function Reservation() {
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(defaultModal);

    const [reservations, setReservations] = useState([]);
    const [range, setRange] = useState(); // { from: Date, to: Date }
    const [userId, setUserId] = useState(null);
    const [apartment, setApartment] = useState(null);

    const router = useRouter();
    const params = useParams();
    const accessToken = getCookie("access_token");

    const closeModal = () => setModal(defaultModal);
    const openOk = (message, onOk) =>
        setModal({ open: true, message, confirmMode: false, onConfirm: onOk || closeModal, onClose: null });

    const formatDate = (date) => {
        if (!date) return null;
        const d = new Date(date);
        return `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')}`;
    }

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const res = await fetch(`${productApi}/reservations/booked_date/${params.id}/`);
                if (res.status === 404) {
                    router.push("/404");
                    return;
                }
                if (!res.ok) throw new Error(`Error while loading: ${res.status}`);
                const data = await res.json();
                setReservations(data.results || []);
            } catch (err) {
                console.error("Error while booking loading:", err);
            }
        };

        fetchApartment(params?.id, router, setApartment, setLoading);
        fetchReservations();

        getUserByToken(accessToken).then((res) => {
            setUserId(res?.user_id ?? null);
        });
    }, [params.id, accessToken, router]);

    const bookedDates = reservations.flatMap((res) => {
        const start = new Date(res.start_date);
        const end = new Date(res.end_date);
        const dates = [];
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            dates.push(new Date(d.getFullYear(), d.getMonth(), d.getDate()));
        }
        return dates;
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = {
            start_date: formatDate(range?.from),
            end_date: formatDate(range?.to),
            guests: e.target.guests.value,
            comment: e.target.comment.value,
        };

        try {
            await createReservation(params.id, formData, accessToken);
            openOk("Reservation created successfully!", () =>
                router.push(`/apartments/${params.id}`)
            );
        } catch (err) {
            if (err.status === 400) {
                openOk("Error: selected dates are unavailable or invalid");
            } else if (err.status === 404) {
                openOk("Apartment Not Found");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!userId || !apartment?.landlord?.id) return;
        if (String(userId) === String(apartment.landlord.id)) {
            router.push("/reservation");
        }
    }, [userId, apartment?.landlord?.id, router]);

    if (loading) return <Loader />;

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>New Reservation</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Select Dates
                    <div className="mt-2">
                        <DayPicker
                            mode="range"
                            numberOfMonths={2}
                            selected={range}
                            onSelect={setRange}
                            disabled={bookedDates}
                            modifiersClassNames={{
                                selected: 'bg-blue-500 text-white rounded',
                                range_start: 'bg-blue-600 text-white rounded-l',
                                range_end: 'bg-blue-600 text-white rounded-r'
                            }}
                        />
                    </div>
                </label>

                {range?.from && range?.to && (
                    <p className={styles.selectedDates}>
                        Selected: {range.from.toLocaleDateString()} — {range.to.toLocaleDateString()}
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
}


export default Reservation;
