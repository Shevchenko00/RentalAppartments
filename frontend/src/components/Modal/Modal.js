'use client'

import React from 'react';
import * as styles from './Modal.module.scss';

const Modal = ({ message, onClose, onConfirm }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <p>{message}</p>
                <div className={styles.buttons}>
                    {onConfirm ? (
                        <>
                            <button className={styles.confirmBtn} onClick={onConfirm}>Yes</button>
                            <button className={styles.cancelBtn} onClick={onClose}>No</button>
                        </>
                    ) : (
                        <button className={styles.closeBtn} onClick={onClose}>OK</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
