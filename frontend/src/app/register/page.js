'use client';
import { motion } from 'framer-motion';
import Input from "@/components/Input/Input";
import * as styles from './page.module.scss'
import Button from "@/components/Button/Button";
import Link from 'next/link';
const RegisterPage = () => {
    return(
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
            <div className={styles.page_wrapper}>
                <div className={styles.register_container} >
                    <h1>Welcome!</h1>
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
                    <Link href="/about" className={styles.link_to_login}>
                        Go to About Page
                    </Link>
                </div>
            </div>
            </motion.div>
        </>
    );
}

export default RegisterPage;