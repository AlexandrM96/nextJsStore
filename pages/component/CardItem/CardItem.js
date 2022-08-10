import style from '../../../styles/CardItem.module.css';
import styles from "../../../styles/Item.module.css";
import React, {useState} from "react";

export default function CardItem(props) {

    const [state, setState] = useState(() => {
        return {
            displayNum: props.item.quantity,
            btn: true,
            flag: false
        }
    })

    const handleClick = (e) => {

        setState(prev => {
            return {
                ...prev,
                flag: true
            }
        })

        const cardUserId = localStorage.getItem('cardUserId');

        const itemId = props.item.offer_id;

        const plusMinus = e.target.innerText;

        if (state.displayNum <= 1) {
            plusMinus === '+' ?
                setState(prev => {
                    return {
                        ...prev,
                        displayNum: state.displayNum++
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
                        displayNum: state.displayNum++
                    }
                })
                :
                setState(prev => {
                    return {
                        ...prev,
                        displayNum: state.displayNum--
                    }
                })
        }

        const baseUrl = `https://bion.biz-mark.ru/api/v1/general`;

        const quantity = plusMinus === '+' ? state.displayNum + 1 : state.displayNum - 1

        const api = `${baseUrl}/cart?offer_id=${itemId}&quantity=${quantity}`;

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
                    location.reload();
                }
            )
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const clickRemoveItem = () => {

        const idItemRemove = props.item.id;

        const baseUrl = `https://bion.biz-mark.ru/api/v1/general`;

        const api = `${baseUrl}/cart?position_id=${idItemRemove}`;

        fetch(api, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cart': 11
            },
        })
            .then((response) => response.json())
            .then((data) => {
                    location.reload();
                }
            )
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            <p>
                {props.item.product.name}
            </p>
            <div className={style.cardItem__containerPriceAndButtons}>
                <div className={styles.listItemCard__itemButtons}>
                    <button onClick={handleClick}>+</button>
                    <div>
                        {state.displayNum}
                    </div>
                    <button onClick={handleClick}>-</button>
                </div>
                <p>X{props.item.quantity}</p>
                <p className={style.cardItem__containerPrice}>
                    {props.item.price} ₽
                </p>
                <button
                    onClick={clickRemoveItem}
                    className={style.containerPriceAndButtons__button}>X
                </button>
            </div>
        </>
    );
}