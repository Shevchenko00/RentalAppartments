'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';

const Header = ({ links }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className={styles.head}>
            <img src={'/images/ApartmentLogo.png'} className={styles.logo}/>

            <button className={styles.burger} onClick={toggleMenu} aria-label="Toggle navigation">
                <span className={isOpen ? styles.open : ''}></span>
                <span className={isOpen ? styles.open : ''}></span>
                <span className={isOpen ? styles.open : ''}></span>
            </button>

            <nav className={`${styles.nav} ${isOpen ? styles.show : ''}`}>
                {links.map(({ title, href }, index) => (
                    <Link key={index} href={href} className={styles.link} onClick={() => setIsOpen(false)}>
                        {title}
                    </Link>
                ))}
            </nav>
        </header>
    );
};

export default Header;
