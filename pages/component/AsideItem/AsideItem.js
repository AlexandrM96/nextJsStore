import React, {useState} from "react";
import {useSelector, useDispatch} from 'react-redux'
import {apiRequestCategories, apiRequestCategoriesAddItems} from '../../../ApiRequestion/API';
import ArrayCategoriesItem from '../ArrayCategoriesItem/ArrayCategoriesItem';
import {changingFlag} from '../../../redux/action';
import styles from '../../../styles/AsideItem.module.css';

export default function AsideItem(props) {

    const arrayCategories = useSelector((state) => state.arrayCategories[0]);

    const dispatch = useDispatch();

    const [state, setState] = useState(() => {
        return {
            status: false
        }
    })

    const ChangeOver = (item) => {
        const str = item.join('|');
        dispatch(changingFlag(true));
        apiRequestCategories(str);
        setState(prev => {
            return {
                ...prev,
                status: true
            }
        })
    }

    const clickCategories = () => {
        const id = props.item.id;
        dispatch(changingFlag(true));
        apiRequestCategoriesAddItems(id);
    }

    return (
        <li
            className={styles.asideItem__element}
            onClick={clickCategories}
            onMouseEnter={() => (ChangeOver(props.item.children_id_list))}
            onMouseLeave={() => (
                setState(prev => {
                    return {
                        ...prev,
                        status: false
                    }
                })
            )}
        >{props.item.name}
                    <ul className={state.status === true ? styles.asideItem__elementList : styles.asideItem__elementList__none}>
                        {arrayCategories && arrayCategories.map(item =>
                            <li key={item.id}>
                                    <ArrayCategoriesItem item={item}/>
                            </li>
                        )}
                    </ul>
        </li>
    );
}