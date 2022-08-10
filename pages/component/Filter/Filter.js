import React, {useState} from "react";
import {
    fetchpostsEight
} from '../../../store/actions/postActions';
import styles from '../../../styles/Filter.module.css'
import {useDispatch, useSelector} from "react-redux";
import Link from "next/link";

export default function Filter() {

    const dispatch = useDispatch();

    // const cardId = localStorage.getItem('cardUserId');
    // console.log('local', cardId);

    const categoryId = useSelector((state) => state.post.categoryId);

    const pagNum = useSelector((state) => state.post.pagNum);

    const [state, setState] = useState(() => {
        return {
            settingName: '',
            statusSettingName: false,
            minPrice: 0,
            maxPrice: 9999999
        }
    });

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
        dispatch(fetchpostsEight(pagNum, categoryId, '', 0, 9999999));
        setState(prev => {
            return {
                ...prev,
                settingName: '',
                statusSettingName: false,
                minPrice: 0,
                maxPrice: 9999999
            }
        })
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
                        href={`general/products?search=${state.settingName}&filter[price][min]=${state.minPrice}&filter[price][max]=${state.maxPrice}`} prefetch={false}>
                        <a>
                            <button className={styles.filter__wordButton}
                                    onClick={() => (dispatch(fetchpostsEight(pagNum, categoryId, state.settingName, state.minPrice, state.maxPrice)))}
                            >
                                Поиск
                            </button>
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
                            value={state.minPrice}
                            onChange={changeInput}
                            placeholder="От"
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
                            value={state.maxPrice}
                            onChange={changeInput}
                            placeholder="До"
                        />
                    </div>
                </div>
                <Link
                    href={`general/products?search=${state.settingName}&filter[price][min]=${state.minPrice}&filter[price][max]=${state.maxPrice}`} prefetch={false}>
                    <a>
                        <button
                            onClick={() => (dispatch(fetchpostsEight(pagNum, categoryId, state.settingName, state.minPrice, state.maxPrice)))}
                            className={styles.filter__wordButton}>Применить
                        </button>
                    </a>
                </Link>
                <button
                    onClick={clickRemove}
                    className={styles.filter__wordButton}
                >
                    Очистить
                </button>
                <Link href={`/card/27`} prefetch={false}>
                    <a className={styles.filter__wordButton}>Корзина</a>
                </Link>
                <Link href={`/spisok-pokupok`} prefetch={false}>
                    <a className={styles.filter__wordButton}>Список покупок</a>
                </Link>
            </div>
        </div>
    )
}
