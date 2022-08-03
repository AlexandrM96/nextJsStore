import {useRouter} from "next/router";
import styles from "../../styles/Item.module.css";
import React, {useState} from "react";

export default function Item({item}) {
    const {query} = useRouter();
    console.log(query, item)

    const [state, setState] = useState(() => {
        return {
            displayNum: 1,
            btn: true,
            flag: false
        }
    })

    const clickAddToCard = () => {

        setState(prev => {
            return {
                ...prev,
                flag: true
            }
        })

        const cardUserId = localStorage.getItem('cardUserId');

        const itemId = item.data.id;

        const baseUrl = `https://bion.biz-mark.ru/api/v1/general`;

        const api = `${baseUrl}/cart?offer_id=${itemId}&quantity=${state.displayNum}`;

        fetch(api, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cart': cardUserId
            },
        })
            .then((response) => response.json())
            .then((data) => {
                    localStorage.setItem('cardUserId', data.message);
                    setState(prev => {
                        return {
                            ...prev,
                            flag: false
                        }
                    })
                }
            )
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleClick = (e) => {
        const plusMinus = e.target.innerText;
        // if (state.displayNum < quantity) {
        if (state.displayNum <= 1) {
            plusMinus === '+' ?
                setState(prev => {
                    return {
                        ...prev,
                        displayNum: state.displayNum + 1
                    }
                })
                :
                setState(prev => {
                    return {
                        ...prev,
                        btn: false
                    }
                })
        } else {
            plusMinus === '+' ?
                setState(prev => {
                    return {
                        ...prev,
                        displayNum: state.displayNum + 1
                    }
                })
                :
                setState(prev => {
                    return {
                        ...prev,
                        displayNum: state.displayNum - 1
                    }
                })
        }
    };

    return (
        <div>
            <h1>{item.data.name}</h1>
            <div className={styles.item__infoContainer}>
                <img src='https://aristokratrest.com/files/aristokratrest/image/no_product.jpg' alt='play'/>
                <ul>
                    <li>Price: <span className={styles.item__infoContainer__span}>{item.data.offers[0].price} ₽ </span>
                    </li>
                    <li>Bonuses: <span className={styles.item__infoContainer__span}>{item.data.offers[0].bonuses}</span>
                    </li>
                    <li>Code: <span className={styles.item__infoContainer__span}>{item.data.offers[0].code}</span></li>
                    <li>Height: <span className={styles.item__infoContainer__span}>{item.data.offers[0].height}</span>
                    </li>
                    <li>Quantity: <span
                        className={styles.item__infoContainer__span}>{item.data.offers[0].quantity}</span></li>
                    <li>Volume: <span className={styles.item__infoContainer__span}>{item.data.offers[0].volume}</span>
                    </li>
                    <li>Weight: <span className={styles.item__infoContainer__span}>{item.data.offers[0].weight}</span>
                    </li>
                    <li>Width: <span className={styles.item__infoContainer__span}>{item.data.offers[0].width}</span>
                    </li>
                    <li>Description: <span className={styles.item__infoContainer__span}>{item.data.description}</span>
                    </li>
                </ul>
            </div>
            <div className={styles.itemContainer__itemButtons}>
                <div className={styles.listItemCard__itemButtons}>
                    <button onClick={handleClick}>+</button>
                    <div>
                        {state.displayNum}
                    </div>
                    <button onClick={handleClick}>-</button>
                </div>
                <div className={styles.contentItem__containerPriseAndCartButton}>
                    <button onClick={clickAddToCard} className={styles.priseAndCartButton__button}>
                        {state.flag === false ?
                            <span>В корзину</span>
                            :
                            <img src='img/down.png' className={styles.load__img} alt="logo"/>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
};

export async function getServerSideProps({params}) {
    const baseUrl = `https://bion.biz-mark.ru/api/v1/general`;
    const response = await fetch(`${baseUrl}/products/${params.id}`)
    const item = await response.json()
    return {
        props: {item}, // will be passed to the page component as props
    }
}