'use client'
import styles from './ApartmentListItem.module.scss'
import Link from "next/link";


const ApartmentListItem = ({ id, title, description, price, img}) => {
    return (
        <>

            <div className={styles.hli_container}>
                <div className={styles.img_block}>
                    <img src={img} alt={title} />
                </div>
                <div className={styles.text_wrapper}>
                    <Link href={`/apartments/${id}`} className={styles.link_wrapper}>
                    <h1>{title}</h1>
                    </Link>

                    <div className={styles.txt_block}>
                        <p className={styles.price}>${price}</p>
                        <p>{description}</p>
                    </div>
                </div>
                {/*{landlord && (*/}
                {/*    <div className="landlord-info">*/}
                {/*        <p><strong>Landlord:</strong> {landlord.first_name} {landlord.last_name}</p>*/}
                {/*        <p><strong>Phone:</strong> {landlord.phone_number}</p>*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        </>
    );
};


export default ApartmentListItem;