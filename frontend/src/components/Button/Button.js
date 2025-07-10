import * as styles from './Button.module.scss'

const Button = ({ text, type, disabled }) => {
    return(
        <button type={type} disabled={disabled} className={styles.button}>{text}</button>
    );
}

export default Button;