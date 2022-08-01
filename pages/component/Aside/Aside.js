
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AsideItem from '../AsideItem/AsideItem';
import {fetchposts, fetchpostsTwo, fetchpostsSix} from '../../../store/actions/postActions';
import Link from "next/link";
import styles from '../../../styles/Aside.module.css';

const Aside = ({users}) => {
    const  arrayGeneralCategories  = useSelector((state) => state.post.arrayGeneralCategories[0]);
    const {posts} = useSelector(state => state.post);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchpostsSix(true));
        dispatch(fetchposts());
        dispatch(fetchpostsTwo())
    }, [])

    return (
        <>
            <aside className={styles.aside}>
                <div className={styles.aside__container}>
                    <ul className={styles.aside__container__ulList}>
                        {arrayGeneralCategories && arrayGeneralCategories.map(item =>
                            <li
                                className={styles.ulList__element}
                                key={item.id}
                            >
                                <AsideItem item={item} />
                            </li>
                        )}
                    </ul>
                </div>
            </aside>
        </>
    );
}

export default Aside;

export async function getStaticProps(context) {
    const baseUrl = `https://bion.biz-mark.ru/api/v1/general`;
    const response = await fetch(`${baseUrl}/categories`)
    const users = await response.json()
    console.log('asdasdasdasd3333333', users);
    return {
        props: {users}, // will be passed to the page component as props
    }
}
