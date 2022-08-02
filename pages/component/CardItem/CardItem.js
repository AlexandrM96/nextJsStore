import style from '../../../styles/CardItem.module.css';
export default function CardItem(props) {

    console.log(props)

    // const cardUserId = localStorage.getItem('cardUserId');

    const clickRemoveItem = () => {
        console.log('удалил')
        const idItemRemove = props.item.id;

        const baseUrl = `https://bion.biz-mark.ru/api/v1/general`;

        const api = `${baseUrl}/cart?position_id=${idItemRemove}`;

        fetch(api, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cart': 11
            },
        })
            .then((response) => response.json())
            .then((data) => {
                location.reload();
                }
            )
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <>
        <p>
            {props.item.product.name}
        </p>
            <div className={style.cardItem__containerPriceAndButtons}>
                <p>X{props.item.quantity}</p>
                <p className={style.cardItem__containerPrice}>
                    {props.item.price} ₽
                </p>
                <button
                    onClick={clickRemoveItem}
                    className={style.containerPriceAndButtons__button}>X</button>
            </div>
        </>
    );
}