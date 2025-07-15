import styles from './HotelListItem.module.scss'


const ApartmentListItem = ({title, description, price}) => {
    return (
        <div className={styles.hli_container}>
            <div className={styles.img_block}>
                <img src="" alt="Hotel" />
            </div>
            <div className={styles.text_wrapper}>
                <h1>{title}</h1>
                <div className={styles.txt_block}>
                    <p className={styles.price}>${price}</p>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
};


export default ApartmentListItem;