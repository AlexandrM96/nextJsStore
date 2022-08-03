import React, {useState} from 'react';
import {useRouter} from "next/router";
import validator from 'validator';
import styles from '../../styles/Registration.module.css';

export default function Register({userWishList}) {

    const {query} = useRouter()

    const [register, setRegister] = useState(() => {
        return {
            username: "",
            phoneNumber: "",
            email: "",
            password: "",
            password2: "",
        }
    })

    const changeInputRegister = event => {
        event.persist()
        setRegister(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    const submitChackin = event => {
        event.preventDefault();
        if (!validator.isEmail(register.email)) {
            alert("You did not enter email")
        } else if (register.phoneNumber === '') {
            alert("You did not enter phone")
        } else if (register.password !== register.password2) {
            alert("Repeated password incorrectly")
        } else if (!validator.isStrongPassword(register.password, {minSymbols: 0})) {
            alert("Password must consist of one lowercase, uppercase letter and number, at least 8 characters")
        } else {
            const name = register.username;
            const phone = register.phoneNumber;
            const email = register.email;
            const password = register.password;
            const baseUrl = `https://bion.biz-mark.ru/api/v1/auth/register`;
            fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": name,
                    "email": email,
                    "password": password,
                    "password_confirmation": password
                })
            })
                .then((response) => response.json())
                .then((data) => {
                        if (!data.message) {
                            alert("Успешно!");
                        } else {
                            alert(data.message);
                        }
                    }
                )
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    return (
        <div className={styles.registration}>
            <h2 className={styles.registration__title}>Registration</h2>
            <form className={styles.registration__form} onSubmit={submitChackin}>
                <p className={styles.registration__formParagraph}>
                    Name
                    < input
                        className={styles.registration__formInput}
                        type="username"
                        id="username"
                        name="username"
                        value={register.username}
                        onChange={changeInputRegister}
                    />
                </p>
                <p className={styles.registration__formParagraph}>
                    Phone number
                    <input
                        className={styles.registration__formInput}
                        type="number"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={register.phoneNumber}
                        onChange={changeInputRegister}
                        formnovalidate
                    />
                </p>
                <p className={styles.registration__formParagraph}>
                    Email
                    <input
                        className={styles.registration__formInput}
                        type="email"
                        id="email"
                        name="email"
                        value={register.email}
                        onChange={changeInputRegister}
                        formnovalidate
                    />
                </p>
                <p className={styles.registration__formParagraph}>
                    Password
                    <input
                        className={styles.registration__formInput}
                        type="password"
                        id="password"
                        name="password"
                        value={register.password}
                        onChange={changeInputRegister}
                    />
                </p>
                <p className={styles.registration__formParagraph}>
                    Repeat password
                    <input
                        className={styles.registration__formInput}
                        type="password"
                        id="password2"
                        name="password2"
                        value={register.password2}
                        onChange={changeInputRegister}
                    />
                </p>
                <input className={styles.registration__formButton}
                       value={'Sign in'}
                       type="submit"/>
            </form>
        </div>
    )
};

export async function getServerSideProps({params}) {
    const baseUrl = `https://bion.biz-mark.ru/api/v1/general/wishlist`;
    const response = await fetch(baseUrl);
    const userWishList = await response.json();
    return {
        props: {userWishList}, // will be passed to the page component as props
    }
}