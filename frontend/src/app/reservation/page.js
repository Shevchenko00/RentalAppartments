'use client'
import { useEffect, useState } from "react";
import * as styles from "./page.module.scss";
import Loader from "@/components/Loader/Loader";
import {
    fetchUserReservations,
    fetchLandlordReservations,
    approveReservation,
    cancelReservation
} from "@/api/reservationApi";
import getCookie from "@/uttils/getCookie/getCookie";

const Reservations = () => {
    const [tab, setTab] = useState("user");
    const [loading, setLoading] = useState(false);
    const [userReservations, setUserReservations] = useState([]);
    const [landlordReservations, setLandlordReservations] = useState([]);
    const accessToken = getCookie('access_token');

    const fetchData = async () => {
        setLoading(true);
        try {
            if (tab === "user") {
                const data = await fetchUserReservations(accessToken);
                setUserReservations(data);
            } else if (tab === "landlord") {
                const data = await fetchLandlordReservations(accessToken);
                setLandlordReservations(data);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [tab]);

    const handleApprove = async (reservationId) => {
        try {
            await approveReservation(reservationId, accessToken);
            fetchData();
        } catch (err) {
            alert("Failed to approve reservation");
        }
    };

    const handleCancel = async (reservationId) => {
        try {
            await cancelReservation(reservationId, accessToken);
            fetchData();
        } catch (err) {
            alert("Failed to cancel reservation");
        }
    };

    if (loading) return <Loader />;

    const renderReservations = (reservations, isLandlord = false) => {
        if (!reservations || reservations.length === 0)
            return <p className={styles.loading}>No reservations found.</p>;

        return (
            <ul className={styles.tabList}>
                {reservations.map((res) => {
                    const apartment = res.apartment || {};
                    return (
                        <li key={res.id} className={styles.tabItem}>
                            <div className={styles.apartmentCard}>
                                <div className={styles.apartmentTitle}>{apartment.title}</div>
                                <div className={styles.apartmentDetails}>
                                    <div className={styles.apartmentDetailItem}><strong>City:</strong> {apartment.city}</div>
                                    <div className={styles.apartmentDetailItem}><strong>Street:</strong> {apartment.street}</div>
                                    <div className={styles.apartmentDetailItem}><strong>Type:</strong> {apartment.apartment_type}</div>
                                    <div className={styles.apartmentDetailItem}><strong>Rooms:</strong> {apartment.count_room}</div>
                                    <div className={styles.apartmentDetailItem}><strong>Price:</strong> ${apartment.price}</div>
                                </div>
                                {apartment.description && <div className={styles.apartmentDescription}>{apartment.description}</div>}
                                <div className={styles.apartmentStatus}>
                                    Dates: {res.start_date} — {res.end_date} | Guests: {res.guests} | Status: {res.is_approved ? "Approved" : "Pending"}
                                </div>
                                {isLandlord && !res.is_approved && (
                                    <div className={styles.actions}>
                                        <button className={styles.approveBtn} onClick={() => handleApprove(res.id)}>Approve</button>
                                        <button className={styles.cancelBtn} onClick={() => handleCancel(res.id)}>Cancel</button>
                                    </div>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Reservations</h1>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tabButton} ${tab === "user" ? styles.activeTab : ""}`}
                    onClick={() => setTab("user")}
                >
                    My Reservations
                </button>
                <button
                    className={`${styles.tabButton} ${tab === "landlord" ? styles.activeTab : ""}`}
                    onClick={() => setTab("landlord")}
                >
                    Reservations Request
                </button>
            </div>

            <div className={styles.tabContent}>
                {tab === "user" && renderReservations(userReservations)}
                {tab === "landlord" && renderReservations(landlordReservations, true)}
            </div>
        </div>
    );
};

export default Reservations;
