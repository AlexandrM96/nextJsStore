
import styles from '../../../styles/ContentItem.module.css';
import * as types from "../../../store/reducers/types";

export default function ContentItem(props) {

const clickAddToCard = () => {

    const cardUserId = localStorage.getItem('cardUserId')

    const itemId = props.item.id;

    const baseUrl = `https://bion.biz-mark.ru/api/v1/general`;

    const api = `${baseUrl}/cart?offer_id=${itemId}&quantity=1`;

    fetch(api, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'cart': cardUserId
        },
        // body: JSON.stringify({
        //     offer_id: itemId,
        //     quantity: 1
        // })
    })
        .then((response) => response.json())
        .then((data) => {
                console.log(data);
            localStorage.setItem('cardUserId', data.message);
            }
        )
        .catch((error) => {
            console.error('Error:', error);
        });
 }

    return (
        <div className={styles.contentItem}>
            //тут
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
                        <button onClick={clickAddToCard} className={styles.priseAndCartButton__button} >В корзину</button>
                    </div>
                </div>
            </div>
        </div>
    );
}