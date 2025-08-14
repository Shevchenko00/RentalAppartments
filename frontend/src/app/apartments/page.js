'use client'

import styles from './page.module.scss'
import {useRouter} from "next/navigation";
import getCookie from "@/uttils/getCookie/getCookie";
import {useEffect, useState} from "react";
import {getApartment, getFiltredResult} from "@/api/apartmentsApi";
import ApartmentListItem from "@/components/HotelListItem/ApartmentListItem";
import AnimatedSection from "@/components/AnimateSection/AnimateSection";
import {fetchNewToken} from "@/api/auth";
import {useLoading} from "@/hooks/useLoader";
import Loader from "@/components/Loader/Loader";

import { useReducer } from "react";

const initialState = {
    minPrice: "",
    maxPrice: "",
    search: "",
    minRoom: "",
    maxRoom: "",
    city: ""
};
const resetFilters = () => {
    window.location.reload();
    return initialState
}


function reducer(state, action) {
    switch (action.type) {
        case "setMinPrice":
            return { ...state, minPrice: action.value };
        case "setMaxPrice":
            return { ...state, maxPrice: action.value };
        case "setMinRoom":
            return  {...state, minRoom: action.value}
        case "setMaxRoom":
            return  {...state, maxRoom: action.value}
        case "setCity":
            return { ...state, city: action.value };
        case "setSearch":
            return { ...state, search: action.value };
        case "reset":
            resetFilters();
        default:
            return state;
    }
}



const Apartments = () => {
    const router = useRouter()
    const [apartments, setApartments] = useState([])
    const { loading, setLoading } = useLoading();
    const [state, dispatch] = useReducer(reducer, initialState);



    useEffect(() => {
        const accessToken = getCookie('access_token');
        const refreshToken = getCookie('refresh_token')
        const fetchApartments = async () => {
            try {
                const data = await getApartment(accessToken);
                setApartments(data);
            } catch (error) {
                if (error.status === 401) {
                    try{
                        await fetchNewToken(refreshToken)
                    } catch (error) {
                        if (error.status === 422 || error.status === 401) {
                            router.push('/login');
                            document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                        }
                    }
                } else {
                    console.error('Failed to fetch apartments:', error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchApartments();
        console.log(apartments);

    }, [router]);

    if (loading) return <Loader/>;

    return (
        <>
            <div className={styles.container}>
                <AnimatedSection>
                <div className={styles.layout}>
                    <main className={styles.main}>
                        {apartments.map(apartment => (
                            <ApartmentListItem
                                key={apartment.id}
                                id={apartment.id}
                                img={apartment.photo}
                                title={apartment.title}
                                price={apartment.price}
                                description={apartment.description}
                            />
                            )
                        )}

                    </main>
                    <aside className={styles.sidebar}>
                        <div className={styles.filter}>
                            <h1>Price</h1>
                            <div className={styles.inputs}>
                                <input type='number' min='0' value={state.minPrice}
                                       placeholder="min"
                                       onChange={(e) => {
                                           const value = e.target.value;
                                           if (value === "" || Number(value) >= 0) {
                                               dispatch({ type: "setMinPrice", value });
                                           }}}
                                />
                                <input type='number' min='0' value={state.maxPrice}
                                       placeholder="max"
                                       onChange={(e) => {
                                           const value = e.target.value;
                                           if (value === "" || Number(value) >= 0) {
                                               dispatch({ type: "setMaxPrice", value });
                                           }}}
                                />
                            </div>

                        </div>
                        <div className={styles.filter}>
                            <h1>Number of rooms</h1>
                            <div className={styles.inputs}>
                                <input type='number' min='0' value={state.minRoom}
                                       placeholder="min"
                                       onChange={(e) => {
                                           const value = e.target.value;
                                           if (value === "" || Number(value) >= 0) {
                                               dispatch({ type: "setMinRoom", value });
                                           }}}
                                />
                                <input type='number' min='0' value={state.maxRoom}
                                       placeholder="max"
                                       onChange={(e) => {
                                           const value = e.target.value;
                                           if (value === "" || Number(value) >= 0) {
                                               dispatch({ type: "setMaxRoom", value });
                                           }}}
                                />
                            </div>

                        </div>
                        <div className={styles.filter}>
                            <h1>City</h1>
                            <div className={styles.inputs}>
                                <input type='text' value={state.city}
                                       placeholder=""
                                       onChange={(e) => dispatch({type: 'setCity', value: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className={styles.sidebarButtons}>
                            <button
                                className={styles.btn}
                                type="button"
                                onClick={async () => {
                                    const token = getCookie("access_token");

                                    try {
                                        const data = await getFiltredResult(
                                            state.minPrice,
                                            state.maxPrice,
                                            state.minRoom,
                                            state.maxRoom,
                                            state.city,
                                            token
                                        );
                                        setApartments(data);
                                    } catch (error) {
                                        console.error("Ошибка при фильтрации:", error);
                                    }
                                }}
                            >
                                Apply
                            </button>
                            <button className={styles.btn}
                            onClick={() => dispatch({ type: 'reset' })}>Reset</button>
                        </div>
                    </aside>
                </div>
                </AnimatedSection>
            </div>
        </>
    )
}
export default Apartments;
