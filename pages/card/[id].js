import {useRouter} from "next/router";
import CardItem from "../component/CardItem/CardItem";
import MainContainer from "../component/MainContainer/MainContainer";
import Head from "next/head";
import styles from '../../styles/Card.module.css';

export default function User({userCard, array, baseUrl, arrayItems}) {

    const {query} = useRouter();

    let sum = 0;

    for (let i = 0; i < userCard.data.length; i++) {
        console.log(userCard.data[i].price_value)
        sum += userCard.data[i].price_value;
    }

    return (
        <>
            <Head>
                <meta></meta>
                <title>Корзина</title>
            </Head>
            <MainContainer url={baseUrl} arrayItems={arrayItems} items={array.data}>
                <div>
                    <div className={styles.card__container}>
                        <uL>
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
    let cart = params;
    const baseUrl = `https://bion.biz-mark.ru/api/v1/general`;
    const response = await fetch(`${baseUrl}/cart`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'cart': cart.id
        }
    });
    const userCard = await response.json();
    const responseTwo = await fetch(`${baseUrl}/categories`);
    const array = await responseTwo.json();
    const arrayItems = {
        data: {
            price: {
                min: 0,
                max: 0
            },
        }
    };
    return {
        props: {userCard, array, baseUrl, arrayItems}, // will be passed to the page component as props
    }
}