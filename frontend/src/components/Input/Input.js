import * as styles from './Input.module.scss'

const Input = ({helpText, type, maxLength, onchange, error, value}) => {
    return  (
        <>
            <label>{helpText}</label>
            <input
                className={styles.Input}
                type={type}
                maxLength={maxLength}
                onChange={onchange}
                value={value}
            />
            {error && (
                <p style={{ color: 'red', fontSize: '0.8rem' }}>
                    {Array.isArray(error) ? error.join('. ') : error}
                </p>
            )}
        </>
    );
}


export default Input;