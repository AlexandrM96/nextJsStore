import Head from "next/head";
import Filter from "../Filter/Filter";
import Link from "next/link";
import styles from "../../../styles/Home.module.css";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchposts} from "../../../store/actions/postActions";
import Aside from "../Aside/Aside";

export default function MainContainer ({url, items, children, keywords}) {

    const [auth, setAuth] = useState(() => {
        return {
            auth: false,
            userName: ''
        }
    })

    const {posts} = useSelector(state => state.post);

    const dispatch = useDispatch();

    const  refreshToken = (token) => {
        const baseUrlTwo = `https://bion.biz-mark.ru`;
        fetch(`${baseUrlTwo}/api/v1/auth/refresh`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then((response) => response.json())
            .then((data) => {
                    console.log((data));
                }
            )
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        const baseUrl = `https://bion.biz-mark.ru/api/v1/account`;
        const token = localStorage.getItem('tokenAuth');
        let idCard = '';

        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then((response) => response.json())
            .then((data) => {
                    idCard = localStorage.getItem('cardUserId');
                    console.log(idCard)
                    setAuth(prev => {
                        return {
                            ...prev,
                            userName: data.data.name,
                            auth: true
                        }
                    })
                }
            )
            .catch((error) => {
                console.error('Error:', error);
                if ( token !== null) {
                    refreshToken(token);
                }
            });
        dispatch(fetchposts());
    }, [])

    return (
        <>
            <Head>
                <meta keywords={"my store" + keywords}></meta>
                <title>Главная страница</title>
            </Head>
            <div className="navbar">
                <Link href={`/`} prefetch={false}>
                    <a className={styles.filter__wordButton}>Главная</a>
                </Link>
                /
                <Link href={`/account/login`} prefetch={false}>
                    <a className={styles.filter__wordButton}>Вход</a>
                </Link>
                /
                <Link href={`/account/register`} prefetch={false}>
                    <a className={styles.filter__wordButton}>Регистрация</a>
                </Link>
                {/*<button>корзина</button>*/}
                <div>
                    ____________________________________________________________
                </div>
                <p>
                    {auth.auth ? auth.userName : 'Авторизуйтесь!'}
                </p>
                <Filter/>
            </div>
            <div className={styles.home__container}>
                <Aside items={items}/>
                {children}
            </div>
            <style jsx>
                {`
                    .navbar {
                        background: orange;
                        padding: 15px;
                    }
                   
                `}
            </style>
        </>
    );
};

