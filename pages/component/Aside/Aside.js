
import {useSelector} from 'react-redux';
import AsideItem from '../AsideItem/AsideItem';
import styles from '../../../styles/Aside.module.css';
export default function Aside() {

    const arrayGeneralCategories = useSelector((state) => state.arrayGeneralCategories[0]);

    return (
        <aside>
            <div className={styles.aside__container}>
                <ul>
                    {arrayGeneralCategories && arrayGeneralCategories.map(item =>
                        <li
                            className={styles.ulList__element}
                            key={item.id}
                        >
                                <AsideItem item={item}/>
                        </li>
                    )}
                </ul>
            </div>
        </aside>
    );
}
