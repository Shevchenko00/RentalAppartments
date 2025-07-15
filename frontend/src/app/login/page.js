'use client'
import * as styles from "@/app/register/page.module.scss";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Link from "next/link";
import MotionForPage from "@/uttils/MotionForPage/MotionForPage";
import {useEffect, useState} from "react";
import registerSchema, {loginSchema} from "@/schemas/auth.schema";
import { loginUser } from '@/api/auth';
import getCookie from "@/uttils/getCookie/getCookie";
import {useRouter} from "next/navigation";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [JSONError, setJSONError] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter()

    useEffect(() => {
        if (getCookie('access_token')) {
            router.push('/apartments')
        }
        }, []);


    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const result = registerSchema.safeParse({ email, password });

            if (!result.success) {
                const fieldErrors = result.error.flatten().fieldErrors;
                setErrors(fieldErrors);
            }

            const data = await loginUser({ email, password });

            document.cookie = `access_token=${data.access_token}; path=/; samesite=Lax`;
            document.cookie = `refresh_token=${data.refresh_token}; path=/; samesite=Lax`;


            setErrors({});
            setJSONError({})

            router.push('/apartments')
        } catch (err) {

            if (typeof err === 'object' && err.detail) {
                setJSONError(err);
            } else {
                setJSONError({ detail: 'Unknown error while logging in.' });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const isEmailValid = loginSchema().safeParse({ email, password }).success;
    const isDisabled = !email || !password || !isEmailValid;



    return (
            <>
                <MotionForPage>
                    <form onSubmit={handleSubmitLogin}>
                        <div className={styles.page_wrapper}>
                            <div className={styles.authorization_container}>
                                <h1>Welcome Back!</h1>
                                <Input onchange={(e) => setEmail(e.target.value)} error={errors.email} value={email}
                                       helpText={'Email'} type={'text'}/>
                                <Input onchange={(e) => setPassword(e.target.value)}
                                       value={password} helpText={'Password'} type={'password'}/>
                                <Button disabled={isDisabled || isSubmitting} type={'submit'} text={'submit'}/>
                                <Link href="/register" className={styles.link_to_login}>
                                    Don't have a account?
                                </Link>
                                {typeof JSONError?.detail === 'string' && JSONError.detail.trim() !== '' && (
                                    <p className={styles.error_message}>{JSONError.detail}</p>
                                )}


                            </div>
                        </div>
                    </form>
                </MotionForPage>
            </>
        );
    }

export default Login;