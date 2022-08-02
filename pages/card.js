import {useRouter} from "next/router";
import CardItem from "./component/CardItem/CardItem";
import styles from '../styles/Card.module.css';

export default function User({userCard}) {

    const {query} = useRouter()

    let sum = 0;

    for (let i = 0; i < userCard.data.length; i++) {
        console.log(userCard.data[i].price_value)
        sum += userCard.data[i].price_value;
    }
    return (
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
    )
};

export async function getServerSideProps({params}) {
    const baseUrl = `https://bion.biz-mark.ru/api/v1/general/cart`;

    const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'cart': 11
        }
    })
    const userCard = await response.json()
    return {
        props: {userCard}, // will be passed to the page component as props
    }
}