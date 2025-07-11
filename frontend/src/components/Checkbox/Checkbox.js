import React from "react";
import * as styles from "./Checkbox.module.scss";

const Checkbox = ({ label, checked, onchange, error, value }) => {
    return (
        <div className={styles.checkboxWrapper}>
            <label className={styles.checkboxLabel}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onchange}
                    className={styles.checkboxInput}
                />
                <span className={styles.customCheckbox} />
                {label}
            </label>
            {error && <p className={styles.errorText}>{error}</p>}
        </div>
    );
};

export default Checkbox;
