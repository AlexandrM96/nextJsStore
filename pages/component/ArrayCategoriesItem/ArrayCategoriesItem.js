import {apiRequestCategoriesAddItems} from '../../../ApiRequestion/API';
import {useDispatch, useSelector} from 'react-redux';
import {addIdCategory, changingFlag} from '../../../redux/action';
import {
    fetchpostsThree,
    fetchpostsSix,
    fetchpostsSeven
} from '../../../store/actions/postActions';
import styles from '../../../styles/ArrayCategoriesItem.module.css';
import Link from "next/link";
import React from "react";
import {useRouter} from "next/router";

export default function ArrayCategoriesItem(props) {

    const router = useRouter();

    const minPriсe = useSelector((state) => state.post.minPrice);

    const maxPriсe = useSelector((state) => state.post.maxPrice);

    const dispatch = useDispatch();

    const id = props.item.id;

    const clickCategory = () => {
        const id = props.item.id;
        const page = 1;
        dispatch(addIdCategory(id));
        dispatch(fetchpostsSix(true))
        dispatch(fetchpostsSeven(page))
        console.log('click')
        dispatch(fetchpostsThree(id, 1, '', minPriсe, maxPriсe))
    }

    return (
        <p onClick={clickCategory} className={styles.arrayCategoriesItem}>
            <Link href={`/categories/[id]/[...slug]`} as={`/categories/${props.slug}/${props.item.slug}`}  prefetch={false}>
                    {props.item.name}
            </Link>
        </p>
        // <p onClick={clickCategory} className={styles.arrayCategoriesItem}>
        //     {props.item.name}
        // </p>
    );
}