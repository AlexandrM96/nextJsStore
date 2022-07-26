
import styles from '../../../styles/Content.module.css';
import Image from 'next/image';
export default function ContentItem(props) {

  return (
    <div className={styles.contentItem}>
      <div className={styles.contentItem__container}>
        <div className={styles.contentItem__containerInfo}>
          {/*<img src='https://aristokratrest.com/files/aristokratrest/image/no_product.jpg' alt='play' />*/}
          {/*<Image*/}
          {/*    src="https://aristokratrest.com/files/aristokratrest/image/no_product.jpg"*/}
          {/*    alt="Landscape picture"*/}
          {/*    width={500}*/}
          {/*    height={500}*/}
          {/*/>*/}
          <p>{props.item.name}</p>
        </div>
        <div className={styles.contentItem__containerPriseAndCart}>
          <div>
            {props.item.offers[0].price}{props.item.offers[0].currency}
          </div>
          <div>

          </div>
          <div>
            <button>В корзину</button>
          </div>
        </div>
      </div>
    </div>
  );
}