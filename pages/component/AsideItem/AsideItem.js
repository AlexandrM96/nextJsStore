import React, {useState} from "react";
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {apiRequestCategories, apiRequestCategoriesAddItems} from '../../../ApiRequestion/API';
import ArrayCategoriesItem from '../ArrayCategoriesItem/ArrayCategoriesItem';
import {changingFlag} from '../../../redux/action';
import {
    fetchposts,
    fetchpostsTwo,
    fetchpostsThree,
    fetchpostsFour,
    fetchpostsSix
} from '../../../store/actions/postActions';
import styles from '../../../styles/AsideItem.module.css';
import Link from "next/link";

export default function AsideItem(props) {
    console.log(props);

    const arrayCategories = useSelector((state) => state.post.arrayCategories[0]);

    const minPrise = useSelector((state) => state.post.minPrice);

    const maxPrise = useSelector((state) => state.post.maxPrice);

    const dispatch = useDispatch();

    const [state, setState] = useState(() => {
        return {
            status: false
        }
    })

    const ChangeOver = (item) => {
        const str = item.join('|');
        console.log(str)
        dispatch(fetchpostsFour(str));
        dispatch(fetchpostsSix(true));
        setState(prev => {
            return {
                ...prev,
                status: true
            }
        })
    }

    // const clickCategories = () => {
    //     const id = props.item.id;
    //     console.log('clickCategoriessssssss',id, minPrise, maxPrise);
    //     dispatch(fetchpostsThree(id, 1, '', minPrise, maxPrise));
    // }

    return (

        <div
            className={styles.asideItem__element}
            // onClick={() =>  dispatch(fetchpostsThree( props.item.id, 1, '', 0, 99999999999))}
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
                        <li
                            key={item.id}>
                            <ArrayCategoriesItem slug={props.item.slug}  item={item}/>
                        </li>
                )}
            </ul>
        </div>

    );
}