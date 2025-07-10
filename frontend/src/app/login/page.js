'use client'
import * as styles from "@/app/register/page.module.scss";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Link from "next/link";
import MotionForPage from "@/components/uttils/MotionForPage/MotionForPage";
import {useState} from "react";
import registerSchema from "@/schemas/auth.schema";



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            email,
            password,

        };

        const parsedFormData = {
            ...formData
        };

        const result = registerSchema.safeParse(parsedFormData);

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors(fieldErrors);
            return;
        }

        setErrors({});
        const validData = result.data;
        console.log("Validated form data:", validData);
    };

    return(
        <>
            <MotionForPage>
                <form onSubmit={handleSubmit}>
                    <div className={styles.page_wrapper}>
                        <div className={styles.authorization_container} >
                            <h1>Welcome Back!</h1>
                            <Input onchange={(e) => setEmail(e.target.value)} error={errors.email} value={email} helpText={'Login or Email'} type={'text'}/>
                            <Input  onchange={(e) => setPassword(e.target.value)} error={errors.password} value={password} helpText={'Password'} type={'password'}/>
                            <Button type={'submit'} text={'submit'}/>
                            <Link href="/register" className={styles.link_to_login}>
                                Don't have a account?
                            </Link>
                        </div>
                    </div>
                </form>
            </MotionForPage>
            </>
    );
}

export default Login;