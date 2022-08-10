import {useRouter} from "next/router";
import CardItem from "./component/CardItem/CardItem";
import MainContainer from "./component/MainContainer/MainContainer";
import styles from '../styles/Card.module.css';
import Head from "next/head";
import React from "react";

export default function User({userCard, array, baseUrl}) {

    const {query} = useRouter()

    let sum = 0;

    for (let i = 0; i < userCard.data.length; i++) {
        sum += userCard.data[i].price_value;
    }
    return (
        <>
            <Head>
                <meta></meta>
                <title>Корзина</title>
            </Head>
            <MainContainer url={baseUrl} items={array.data}>
                <div className={styles.card}>
                    <div className={styles.card__container}>
                        <uL className={styles.card__container__list}>
                            {userCard.data.map(item =>
                                <li
                                    className={styles.card__container__listElement}
                                    key={item.id}
                                >
                                    <CardItem item={item}/>
                                </li>
                            )}
                        </uL>
                        <div>Итого: {Math.round(sum)} ₽</div>
                        <div>
                            <button>Оформить заказ</button>
                        </div>
                    </div>
                </div>
            </MainContainer>
        </>
    )
};

export async function getServerSideProps({params}) {

    const baseUrl = `https://bion.biz-mark.ru/api/v1/general/cart`;

    const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'cart': 27
        }
    })
    const userCard = await response.json();
    const baseUrlTwo = `https://bion.biz-mark.ru/api/v1/general`;
    const responseTwo = await fetch(`${baseUrlTwo}/categories`);
    const array = await responseTwo.json();

    return {
        props: {userCard, array, baseUrl}, // will be passed to the page component as props
    }
}