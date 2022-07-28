import {apiRequestCategoriesAddItems} from '../../../ApiRequestion/API';
import AsideItem from '../AsideItem/AsideItem';
import styles from '../../../styles/ContentItem.module.css';

export default function ContentItem(props) {
console.log(props);
    return (
        <div className={styles.contentItem}>
            <div className={styles.contentItem__container}>
                <div className={styles.contentItem__containerInfo}>
                    <img src='https://aristokratrest.com/files/aristokratrest/image/no_product.jpg' alt='play'/>
                    <p>{props.item.name}</p>
                </div>
                <div className={styles.contentItem__containerPriseAndCart}>
                    <div>
                        {props.item.offers[0].price}{props.item.offers[0].currency}
                    </div>
                    <div>

                    </div>
                    <div className={styles.contentItem__containerPriseAndCartButton}>
                        <button className={styles.priseAndCartButton__button} >В корзину</button>
                    </div>
                </div>
            </div>
        </div>
    );
}