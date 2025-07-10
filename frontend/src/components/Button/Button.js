import * as styles from './Button.module.scss'

const Button = ({ text, type }) => {
    return(
        <button type={type} className={styles.button}>{text}</button>
    );
}

export default Button;