import styles from './HotelListItem.module.scss'


const HotelListItem = () => {
    return (
        <div className={styles.hli_container}>
            <div className={styles.img_block}>
                <img src="/your-image.jpg" alt="Hotel" />
            </div>
            <div className={styles.text_wrapper}>
                <h1>Hotel</h1>
                <div className={styles.txt_block}>
                    <p>Description</p>
                </div>
            </div>
        </div>
    );
};


export default HotelListItem;