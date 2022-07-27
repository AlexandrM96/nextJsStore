import {apiRequestGeneralCategories} from '../../../ApiRequestion/API';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AsideItem from '../AsideItem/AsideItem';
import {fetchposts, fetchpostsTwo, fetchpostsSix } from '../../../store/actions/postActions';
import styles from '../../../styles/Aside.module.css';

export default function Aside() {

    const  arrayGeneralCategories  = useSelector((state) => state.post.arrayGeneralCategories[0]);
    const {posts} = useSelector(state => state.post);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchpostsSix(true));
        dispatch(fetchposts());
        dispatch(fetchpostsTwo())
    }, [])
    console.log(arrayGeneralCategories)

    return (
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
    );
}
