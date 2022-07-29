import React, {useState} from "react";
import {
    fetchpostsEight
} from '../../../store/actions/postActions';
import styles from '../../../styles/Filter.module.css'
import {useDispatch} from "react-redux";

export default function Filter() {

    const dispatch = useDispatch();
    const [state, setState] = useState(() => {
        return {
            settingName: '',
            statusSettingName: false
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
        console.log(state.settingName)
    };

    return (
        <div className={styles.filter}>
            <div className={styles.filter__container}>
                <div className={styles.filter__containerWord}>
                    <input
                        className={styles.filter__wordInput}
                        type="settingName"
                        id="settingName"
                        name="settingName"
                        placeholder="Поиск..."
                        onChange={changeInput}
                    />
                    <button className={styles.filter__wordButton}
                            onClick={() => (dispatch(fetchpostsEight(state.settingName)))}
                    >Поиск
                    </button>
                </div>
                <div className={styles.filter__containerPrice}>
                    <div className={styles.filter__price}>
                        <p className={styles.filter__pricePar}>Цена от</p>
                        <input
                            className={styles.priceInput}
                            type="number"
                            id="settingPrice"
                            name="settingPrice"

                            placeholder="От"
                        />
                    </div>
                    <div className={styles.filter__price}>
                        <p className={styles.filter__pricePar}>
                            Цена до {state.settingName}
                        </p>
                        <input
                            className={styles.filter__priceInput}
                            type="number"
                            id="settingPrice"
                            name="settingPrice"

                            placeholder="До"
                        />
                    </div>
                </div>
                <button className={styles.filter__wordButton}>Применить</button>
            </div>
        </div>
    )
}
