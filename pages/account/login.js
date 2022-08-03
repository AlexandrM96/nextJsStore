import React, {useState} from 'react'
import {useRouter} from "next/router";
import validator from 'validator';
import styles from '../../styles/Login.module.css'
import Link from "next/link";

export default function Login({userWishList}) {

    const {query} = useRouter();

    const [register, setRegister] = useState(() => {
        return {
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
        // } else if (!validator.isStrongPassword(register.password, {minSymbols: 0})) {
        //     alert("Password must consist of one lowercase, uppercase letter and number, at least 8 characters")
        } else {
            const email = register.email;
            const password = register.password;
            // LoginUser(email, password);
            const baseUrl = `https://bion.biz-mark.ru/api/v1/auth/login`;
            fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password,
                    "remember": true
                })
            })
                .then((response) => response.json())
                .then((data) => {
                        if (!data.message) {
                            alert("Успешно!");
                            console.log(data);
                            localStorage.setItem('tokenAuth',data.data.token);
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
        <div className={styles.login}>
            <h2 className={styles.login__title}>Login:</h2>
            <form className={styles.login__form} onSubmit={submitChackin}>
                <p className={styles.login__formParagraph}>
                    Email:
                    <input
                        className={styles.login__formInput}
                        type="email"
                        id="email"
                        name="email"
                        value={register.email}
                        onChange={changeInputRegister}
                        formNoValidate
                    />
                </p>
                <p className={styles.login__formParagraph}>
                    Password:
                    <input
                        className={styles.login__formInput}
                        type="password"
                        id="password"
                        name="password"
                        value={register.password}
                        onChange={changeInputRegister}
                    />
                </p>
                <input className={styles.login__formButton}
                       value={'Login'}
                       type="submit"/>
            </form>
            <div className={styles.login__buttonReg} >
                Нет Аккаунта?
                <Link href={`/account/register`}>
                    <a className={styles.login__buttonReg__registration}>Регистрация</a>
                </Link>

            </div>
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