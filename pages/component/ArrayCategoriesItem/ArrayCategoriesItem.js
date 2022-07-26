
import { apiRequestCategoriesAddItems } from '../../../ApiRequestion/API';
import { useDispatch } from 'react-redux';
import { addIdCategory, changingFlag } from '../../../redux/action';
import styles from '../../../styles/ArrayCategoriesItem.module.css';

export default function ArrayCategoriesItem(props) {

  const dispatch = useDispatch();

  const clickCategory = () => {
    const id = props.item.id;
    const page = 1;
    dispatch(addIdCategory(id));
    dispatch(changingFlag(true));
    apiRequestCategoriesAddItems(id, page);
  }

  return (
    <li onClick={clickCategory} className={styles.arrayCategoriesItem}>
      {props.item.name}
    </li >
  );
}