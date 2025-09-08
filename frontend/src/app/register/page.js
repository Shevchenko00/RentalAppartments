"use client";
import Input from "@/components/Input/Input";
import * as styles from './page.module.scss'
import Button from "@/components/Button/Button";
import Link from 'next/link';
import MotionForPage from "@/uttils/MotionForPage/MotionForPage";
import {useEffect, useState} from "react";
import registerSchema from "@/schemas/auth.schema";
import Checkbox from "@/components/Checkbox/Checkbox";
import convertCamelToSnake from "@/uttils/toSnakeCase/toSnakeCase"
import {useRouter} from "next/navigation";
import getCookie from "@/uttils/getCookie/getCookie";
import {registerUser} from "@/api/auth";
const RegisterPage = () => {
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [phoneCountryCode, setPhoneCountryCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateBirth, setDateBirth] = useState('');
    const [isLandlord, setIsLandlord] = useState(false);
    const [JSONError, setJSONError] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter()

    useEffect(() => {
        if (getCookie('access_token')) {
            router.push('/apartments')
        }
    }, []);

    const formData = {
        email,
        password,
        repeatPassword,
        phoneCountryCode,
        phoneNumber,
        country,
        city,
        firstName,
        lastName,
        dateBirth,
        isLandlord,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const parsedFormData = {
            ...formData,
        };

        try {
            const result = registerSchema.safeParse(convertCamelToSnake(parsedFormData));
            if (!result.success) {
                const fieldErrors = result.error.flatten().fieldErrors;
                setErrors(fieldErrors);
                return;
            }

            setErrors({});

            const response = await registerUser(convertCamelToSnake(parsedFormData));
            document.cookie = `access_token=${response.access_token}; path=/; max-age=3600`;
            document.cookie = `refresh_token=${response.refresh_token}; path=/; max-age=604800`;
            router.push('/apartments');

        } catch (err) {
            console.log('Registration error:', err);
            if (typeof err === 'object' && err.detail) {
                setJSONError(err);
            } else {
                setJSONError({ detail: 'Unknown error while registering.' });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const isEmailValid = registerSchema.safeParse(formData).success;
    const isDisabled = !email || !password || isEmailValid || isSubmitting;

    return(
        <>
            <MotionForPage>
                <div className={styles.page_wrapper}>
                    <div className={styles.authorization_container}>
                        <form onSubmit={handleSubmit} noValidate>
                            <h1>Welcome!</h1>
                            <Input
                                helpText={'Email'}
                                type={'text'}
                                value={email}
                                onchange={(e) => setEmail(e.target.value)}
                                error={errors.email}
                            />
                            <Input
                                helpText={'Password'}
                                type={'password'}
                                value={password}
                                onchange={(e) => setPassword(e.target.value)}
                                error={errors.password}
                            />
                            <Input
                                helpText={'Repeat Password'}
                                type={'password'}
                                value={repeatPassword}
                                onchange={(e) => setRepeatPassword(e.target.value)}
                                error={errors.repeat_password}
                            />
                            <Input
                                helpText={'City'}
                                type={'text'}
                                value={city}
                                onchange={(e) => setCity(e.target.value)}
                                error={errors.city}
                            />
                            <Input
                                helpText={'Country'}
                                type={'text'}
                                value={country}
                                onchange={(e) => setCountry(e.target.value)}
                                error={errors.country}
                            />
                            <Input
                                helpText={'Country code'}
                                type={'tel'}
                                maxLength={3}
                                value={phoneCountryCode}
                                onchange={(e) => setPhoneCountryCode(e.target.value)}
                                error={errors.phone_country_code}
                            />
                            <Input
                                helpText={'Phone number'}
                                type={'tel'}
                                value={phoneNumber}
                                onchange={(e) => setPhoneNumber(e.target.value)}
                                error={errors.phone_number}
                            />
                            <Input
                                helpText={'First Name'}
                                type={'text'}
                                value={firstName}
                                onchange={(e) => setFirstName(e.target.value)}
                                error={errors.first_name}
                            />
                            <Input
                                helpText={'Last Name'}
                                type={'text'}
                                value={lastName}
                                onchange={(e) => setLastName(e.target.value)}
                                error={errors.last_name}
                            />
                            <Input
                                helpText={'Date birthday'}
                                type={'date'}
                                value={dateBirth}
                                onchange={(e) => setDateBirth(e.target.value)}
                                error={errors.date_birth}
                            />
                            <Checkbox
                                label="Are you a landlord?"
                                onchange={() => setIsLandlord(!isLandlord)}
                                checked={isLandlord}
                            />
                            <Button disabled={isDisabled} type={'submit'} text={'submit'}/>
                            <Link href="/login" className={styles.link_to_login}>
                                Have an account?
                            </Link>
                            {typeof JSONError?.detail === 'string' && JSONError.detail.trim() !== '' && (
                                <p className={styles.error_message}>{JSONError.detail}</p>
                            )}
                        </form>
                    </div>
                </div>
            </MotionForPage>
        </>
    );
}

export default RegisterPage;
