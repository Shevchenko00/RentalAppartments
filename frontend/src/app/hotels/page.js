import styles from './page.module.scss'
import HotelListItem from "@/components/HotelListItem/HotelListItem";

const Hotels = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.layout}>
                    <main className={styles.main}>
                        <HotelListItem/>
                        <HotelListItem/>
                        <HotelListItem/>
                        <HotelListItem/>
                        <HotelListItem/>
                        <HotelListItem/>
                        <HotelListItem/>
                    </main>
                    <aside className={styles.sidebar}>
                        <div className={styles.filter}>
                            <h1>Price</h1>
                            <div className={styles.inputs}>
                                <input placeholder="min" />
                                <input placeholder="max" />
                            </div>

                        </div>
                        <div className={styles.filter}>
                            <h1>Number of rooms</h1>
                            <div className={styles.inputs}>
                                <input placeholder="min" />
                                <input placeholder="max" />
                            </div>

                        </div>
                        <div className={styles.filter}>
                            <h1>Location</h1>
                            <div className={styles.inputs}>
                                <input placeholder="min" />
                                <input placeholder="max" />
                            </div>
                        </div>
                        <button className={styles.btn} type={'submit'}>Apply</button>
                    </aside>
                </div>
            </div>
        </>
    )
}
export default Hotels;
