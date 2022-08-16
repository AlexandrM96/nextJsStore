import React, {useEffect, useState} from "react";
import style from '../../../styles/CardItem.module.css';
import styles from "../../../styles/Item.module.css";

export default function WishListItem(props) {

    const [state, setState] = useState(() => {
        return {
            displayNum: props.item.quantity,
            btn: true,
            flag: false,
            cardId: null
        }
    });

    console.log(props);

    useEffect(() => {
        const cardUserId = localStorage.getItem('cardUserId');
        const token = localStorage.getItem('tokenAuth');
        setState(prev => {
            return {
                ...prev,
                cardId: cardUserId
            }
        })
    }, []);


    const handleClick = (e) => {
        setState(prev => {
            return {
                ...prev,
                flag: true
            }
        })
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
                'cart': state.cardId
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


    const clickAddToCard = () => {
        setState(prev => {
            return {
                ...prev,
                flag: true
            }
        })
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
                'cart': state.cardId
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

console.log(state.cardId,props.item.id);
    const clickRemoveItem = () => {
        const idItemRemove = props.item.id;
        const baseUrl = `https://bion.biz-mark.ru/api/v1/general`;
        const api = `${baseUrl}/cart?position_id=${idItemRemove}`;
        fetch(api, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cart': state.cardId
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
                {props.item.name}
            </p>
            <div className={style.cardItem__containerPriceAndButtons}>
                <div className={styles.listItemCard__itemButtons}>
                    <button onClick={handleClick}>+</button>
                    <div>
                        {state.displayNum}
                    </div>
                    <button onClick={handleClick}>-</button>
                </div>
                {/*<p>X{props.item.quantity}</p>*/}
                <p className={style.cardItem__containerPrice}>
                    {props.item.offers[0].price} ₽
                </p>
                <button onClick={clickAddToCard} className={styles.priseAndCartButton__button}>
                    {state.flag === false ?
                        <span>В корзину</span>
                        :
                        <img src='img/down.png' className={styles.load__img} alt="logo"/>
                    }
                </button>
                <button
                    onClick={clickRemoveItem}
                    className={style.containerPriceAndButtons__button}>X
                </button>
            </div>
        </>
    );
}