
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AsideItem from '../AsideItem/AsideItem';
import {fetchposts, fetchpostsTwo, fetchpostsSix} from '../../../store/actions/postActions';
import Link from "next/link";
import styles from '../../../styles/Aside.module.css';

const Aside = (props) => {
    // const  arrayGeneralCategories  = useSelector((state) => state.post.arrayGeneralCategories[0]);
    // const {posts} = useSelector(state => state.post);
console.log(props.items)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchpostsSix(true));
        dispatch(fetchposts());
        dispatch(fetchpostsTwo())
    }, [])

    return (
            <aside className={styles.aside}>
                <div className={styles.aside__container}>
                    <ul className={styles.aside__container__ulList}>
                        {props.items.categories.map(item =>
                            <Link href={`/categories/[id]`} as={`/categories/${item.slug}`} prefetch>
                            <li
                                className={styles.ulList__element}
                                key={item.id}
                            >
                                <AsideItem  item={item} />
                            </li>
                            </Link>
                        )}
                    </ul>
                </div>
            </aside>
    );
}

export default Aside;

