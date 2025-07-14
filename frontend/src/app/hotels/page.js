import styles from './page.module.scss'
import Header from "@/components/Header/Header";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

const Hotels = () => {

    return (
        <>
            <div className={styles.container}>

                <div className={styles.layout}>
                    <main className={styles.main}>Контент</main>
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
