import styles from '../../../styles/ContentItem.module.css';
import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";

export default function ContentItem(props) {

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

        const token = localStorage.getItem('tokenAuth');

        const itemId = props.item.id;

        const baseUrl = `https://bion.biz-mark.ru/api/v1/general`;

        const api = `${baseUrl}/cart?offer_id=${itemId}&quantity=${state.displayNum}`;

        fetch(api, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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
        const quantity = props.item.offers[0].quantity;
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
        <div className={styles.contentItem}>
            <div className={styles.contentItem__container}>
                <Link
                      href={`/categories/[id]/[...slug]`} as={`/categories/${props.item.pageUrl}`} prefetch={false}>
                    <a>
                        <div className={styles.contentItem__containerInfo}>
                            <img src='https://aristokratrest.com/files/aristokratrest/image/no_product.jpg'
                                   height="50"
                                   width="50"
                                   alt='play'/>
                            <p>{props.item.name}</p>
                        </div>
                    </a>
                </Link>
                <div className={styles.contentItem__containerPriseAndCart}>
                    <div>
                        {props.item.offers[0].price}{props.item.offers[0].currency}
                    </div>
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
        </div>
    );
}