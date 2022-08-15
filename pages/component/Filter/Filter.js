import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import styles from '../../../styles/Filter.module.css'
import {useSelector} from "react-redux";

export default function Filter(props) {

    const router = useRouter();

    let url = router.asPath;

    const newUrlTwo = router.asPath.split('=').shift();

    const [state, setState] = useState(() => {
        return {
            settingName: '',
            statusSettingName: false,
            minPrice: props.arrayItems.data.price.min,
            maxPrice: props.arrayItems.data.price.max,
            cardId: null,
            token: ''
        }
    });

    useEffect(() => {
        const cardUserId = localStorage.getItem('cardUserId');
        const token = localStorage.getItem('tokenAuth');
        setState(prev => {
            return {
                ...prev,
                cardId: cardUserId,
                token: token
            }
        })
    }, []);

    const changeInput = event => {
        event.persist()
        setState(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    };

    const clickRemove = () => {
        setState(prev => {
            return {
                ...prev,
                settingName: '',
                statusSettingName: false,
                minPrice: 0,
                maxPrice: 0
            }
        })
        router.push({
            pathname: `${url}`
        }).then(r => [])
    }

    if ((newUrlTwo.split('?').pop() === 'page') || (newUrlTwo.split('?').pop() === 'filter_min_price')) {
        let urlArr = url.split('?');
        urlArr.pop();
        url = urlArr[0];
    }

    return (
        <div className={styles.filter}>
            <div className={styles.filter__container}>
                <div className={styles.filter__containerWord}>
                    <input
                        className={styles.filter__wordInput}
                        type="settingName"
                        id="settingName"
                        name="settingName"
                        value={state.settingName}
                        placeholder="Поиск..."
                        onChange={changeInput}
                    />
                    <Link
                        href={`/search/${state.settingName}`} prefetch={false}>
                        <a className={styles.filter__wordButton}
                        >
                            Поиск
                        </a>
                    </Link>
                </div>
                <div className={styles.filter__containerPrice}>
                    <div className={styles.filter__price}>
                        <p className={styles.filter__pricePar}>Цена от</p>
                        <input
                            className={styles.priceInput}
                            type="number"
                            id="minPrice"
                            name="minPrice"
                            onChange={changeInput}
                            placeholder={
                                props.arrayItems.data.price.min !== 0 ?
                                    `От ${props.arrayItems.data.price.min}`
                                    :
                                    'От'
                            }
                        />
                    </div>
                    <div className={styles.filter__price}>
                        <p className={styles.filter__pricePar}>
                            Цена до
                        </p>
                        <input
                            className={styles.filter__priceInput}
                            type="number"
                            id="maxPrice"
                            name="maxPrice"
                            onChange={changeInput}
                            placeholder={
                                props.arrayItems.data.price.max !== 0 ?
                                    `До ${props.arrayItems.data.price.max}`
                                    :
                                    'До'
                            }
                        />
                    </div>
                </div>
                <a
                    className={styles.filter__wordButton}
                    onClick={() => {
                        router.push({
                            pathname: `${url}`,
                            query: {
                                filter_min_price: state.minPrice,
                                filter_max_price: state.maxPrice
                            }
                        }).then(r => [])
                    }}
                >
                    Применить
                </a>
                <a
                    onClick={clickRemove}
                    className={styles.filter__wordButton}
                >
                    Очистить
                </a>
                <Link href={`/card/${state.cardId}`} prefetch={false}>
                    <a className={styles.filter__wordButton}>Корзина</a>
                </Link>
                <Link href={`/spisok-pokupok/${state.token}`} prefetch={false}>
                    <a className={styles.filter__wordButton}>Список покупок</a>
                </Link>
            </div>
        </div>
    )
}
