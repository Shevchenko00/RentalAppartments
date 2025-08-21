import * as styles from './Button.module.scss'

const Button = ({ text, type, disabled, onclick }) => {
    return(
        <button type={type} disabled={disabled} onClick={onclick} className={styles.button}>{text}</button>
    );
}

export default Button;