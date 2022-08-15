import {useSelector} from 'react-redux'
import ContentItem from '../ContentItem/ContentItem';
import Image from "next/image";
import Image1 from '../../../public/img/down.png';
import styles from '../../../styles/Content.module.css';
import NavigationCategoriesButtons from "../NavigationCategoriesButtons/NavigationCategoriesButtons";
import {useRouter} from "next/router";
import PaginationButtons from "../PaginationButtons/PaginationButtons";

export default function Content(props) {

    const router = useRouter();

    const navigationCategoriesArray = props.arrayNavigation.data.categories;

    let url = router.asPath;

    const flagLoad = useSelector((state) => state.post.flagLoad);

    const newUrlTwo = router.asPath.split('=').shift();

    if ((newUrlTwo.split('?').pop() === 'page') || (newUrlTwo.split('?').pop() === 'filter_min_price')) {
        let urlArr = url.split('?');
        urlArr.pop();
        url = urlArr[0];
    }

    return (
        <div className={styles.content}>
            <div className={styles.content__container}>
                <ul
                    className={styles.content__container__navigationUl}
                >
                    {navigationCategoriesArray.map(item =>
                        <li
                            className={styles.content__container__navigationUl__li}
                            key={item.index}
                        >
                            <NavigationCategoriesButtons url={url} item={item}/>
                        </li>
                    )}
                </ul>
                <div>
                    <div
                        className={!flagLoad ? styles.content__containerLoading__false : styles.content__containerLoading}>
                        <Image src={Image1}
                               height="50"
                               width="50"
                               className={styles.load__img}
                               alt="logo"/>
                    </div>
                    {props.arrayItems.data.products.map(item =>
                        <div
                            className={styles.content__containerList}
                            key={item.id}
                        >
                            <ContentItem url={props.urlPage} item={item}/>
                        </div>
                    )}
                </div>
                <PaginationButtons item={props}/>
            </div>
        </div>
    );
}


