import {apiRequestGeneralCategories} from '../../../ApiRequestion/API';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AsideItem from '../AsideItem/AsideItem';
import {fetchposts, fetchpostsTwo, fetchpostsSix} from '../../../store/actions/postActions';
import Link from "next/link";
import styles from '../../../styles/Aside.module.css';

const Aside = ({users}) => {
    //
    // const  arrayGeneralCategories  = useSelector((state) => state.post.arrayGeneralCategories[0]);
    // const {posts} = useSelector(state => state.post);
    //
    // const dispatch = useDispatch();
    //
    // useEffect(() => {
    //     dispatch(fetchpostsSix(true));
    //     dispatch(fetchposts());
    //     dispatch(fetchpostsTwo())
    // }, [])
    console.log('asdasdasdasd', users);
    return (
        <>
            <aside className={styles.aside}>
                <div className={styles.aside__container}>
                    <ul className={styles.aside__container__ulList}>
                        {/*{users.data.categories.map(user =>*/}
                        {/*    <li*/}
                        {/*        className={styles.ulList__element}*/}
                        {/*        key={user.id}>*/}
                        {/*        <Link href={`/users/${user.id}`}>*/}
                        {/*            <a>{user.name}</a>*/}
                        {/*        </Link>*/}
                        {/*    </li>*/}
                        {/*)}*/}
                        {/*{arrayGeneralCategories && arrayGeneralCategories.map(item =>*/}
                        {/*    <li*/}
                        {/*        className={styles.ulList__element}*/}
                        {/*        key={item.id}*/}
                        {/*    >*/}
                        {/*        <AsideItem item={item} />*/}
                        {/*    </li>*/}
                        {/*)}*/}
                    </ul>
                </div>
            </aside>
        </>
    );
}

export default Aside;

export async function getStaticProps(context) {
    const baseUrl = `https://bion.biz-mark.ru/api/v1/general`;
    const response = await fetch(`https://bion.biz-mark.ru/api/v1/general/categories`)
    const users = await response.json()
    console.log('asdasdasdasd3333333', users);
    return {
        props: {users}, // will be passed to the page component as props
    }
}
