"use client";
import Input from "@/components/Input/Input";
import * as styles from './page.module.scss'
import Button from "@/components/Button/Button";
import Link from 'next/link';
import MotionForPage from "@/uttils/MotionForPage/MotionForPage";
import {useState} from "react";
import registerSchema from "@/schemas/auth.schema";
import Checkbox from "@/components/Checkbox/Checkbox";

const RegisterPage = () => {
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneCountryCode, setPhoneCountryCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateBirth, setDateBirth] = useState('');
    const [isLandlord, setIsLandlord] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            email,
            password,
            confirmPassword,
            phoneCountryCode,
            phoneNumber,
            country,
            city,
            firstName,
            lastName,
            dateBirth,
            isLandlord,
        };

        const parsedFormData = {
            ...formData,
            dateBirth: new Date(formData.dateBirth),
        };

        const result = registerSchema.safeParse(parsedFormData);

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors(fieldErrors);
        }

        setErrors({});
        const validData = result.data;
        console.log("Validated form data:", validData);
    };

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
                                value={confirmPassword}
                                onchange={(e) => setConfirmPassword(e.target.value)}
                                error={errors.confirmPassword}
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
                                error={errors.phoneCountryCode}
                            />
                            <Input
                                helpText={'Phone number'}
                                type={'tel'}
                                value={phoneNumber}
                                onchange={(e) => setPhoneNumber(e.target.value)}
                                error={errors.phoneNumber}
                            />
                            <Input
                                helpText={'First Name'}
                                type={'text'}
                                value={firstName}
                                onchange={(e) => setFirstName(e.target.value)}
                                error={errors.firstName}
                            />
                            <Input
                                helpText={'Last Name'}
                                type={'text'}
                                value={lastName}
                                onchange={(e) => setLastName(e.target.value)}
                                error={errors.lastName}
                            />
                            <Input
                                helpText={'Date birthday'}
                                type={'date'}
                                value={dateBirth}
                                onchange={(e) => setDateBirth(e.target.value)}
                                error={errors.dateBirth}
                            />
                            <Checkbox
                                label="Are you a landlord?"
                                onchange={setIsLandlord}
                                error={errors.isLandlord}
                            />
                            <Button type={'submit'} text={'submit'}/>
                            <Link href="/login" className={styles.link_to_login}>
                                Have an account?
                            </Link>
                        </form>
                    </div>
                </div>
            </MotionForPage>
        </>
    );
}

export default RegisterPage;
