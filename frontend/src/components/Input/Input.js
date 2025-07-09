import * as styles from './Input.module.scss'

const Input = ({helpText, type, maxLength}) => {
    return  (
        <input className={styles.Input} placeholder={helpText} type={type} maxLength={maxLength}/>
    );
}


export default Input;