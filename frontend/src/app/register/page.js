import Input from "@/components/Input/Input";
import * as styles from './page.module.scss'
import Button from "@/components/Button/Button";

const RegisterPage = () => {
    return(
        <>
            <div className={styles.page_wrapper}>
                <div className={styles.register_container} >
                    <Input helpText={'Login or Email'} type={'text'}/>
                    <Input helpText={'Password'} type={'password'}/>
                    <Input helpText={'Repeat Password'} type={'password'}/>
                    <Input helpText={'City'} type={'text'}/>
                    <Input helpText={'Country'} type={'text'}/>
                    <Input helpText={'Country code'} type={'tel'} maxLength={3}/>
                    <Input helpText={'Phone number'} type={'tel'}/>
                    <Input helpText={'First Name'} type={'text'}/>
                    <Input helpText={'Last Name'} type={'text'}/>
                    <Input helpText={'date_birth'} type={'date'}/>
                    <Button text={'submit'}/>
                    <a className={styles.link_to_login} href={'#'}>Have u account?</a>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;