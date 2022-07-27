import {apiRequestCategoriesAddItems} from '../../../ApiRequestion/API';
import {useDispatch} from 'react-redux';
import {addIdCategory, changingFlag} from '../../../redux/action';
import {
    fetchposts,
    fetchpostsTwo,
    fetchpostsThree,
    fetchpostsFour,
    fetchpostsSix,
    fetchpostsSeven
} from '../../../store/actions/postActions';
import styles from '../../../styles/ArrayCategoriesItem.module.css';

export default function ArrayCategoriesItem(props) {

    const dispatch = useDispatch();

    const clickCategory = () => {
        const id = props.item.id;
        const page = 1;
        dispatch(addIdCategory(id));
        dispatch(fetchpostsSix(true))
        dispatch(fetchpostsSeven(page))
        console.log('click')
        dispatch(fetchpostsThree(id, page))
    }

    return (
        <p onClick={clickCategory} className={styles.arrayCategoriesItem}>
            {props.item.name}
        </p>
    );
}