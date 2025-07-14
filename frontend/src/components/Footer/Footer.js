// components/Footer.tsx
import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.left}>
                <div className={styles.logo}>
                    <img src="/images/ApartmentLogo.png" alt="Hotel Logo" width={50} />
                </div>
                <p><strong>Hotel</strong></p>
                <p>123 Miami, FL 123123</p>
                <p>Tel: +1 (234) 123-4567</p>
                <p>Email: info@hotel.com</p>
            </div>

            <div className={styles.right}>
                <p><strong>Working time</strong></p>
                <p>City, address, 01234</p>
                <p>00:00–24:00</p>
            </div>

            <div className={styles.copyright}>
                © 2025 All Rights Reserved
            </div>
        </footer>
    );
};


export default Footer;
