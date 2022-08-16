import {useRouter} from "next/router";
import MainContainer from "../component/MainContainer/MainContainer";
import styles from "../../styles/Card.module.css";
import CardItem from "../component/CardItem/CardItem";
import WishListItem from "../component/WishListItem/WishListItem";

export default function WishList({userWishList, array, baseUrl, arrayItems}) {

    const {query} = useRouter()

    console.log(userWishList);
    return (
        <MainContainer url={baseUrl} arrayItems={arrayItems} items={array.data}>
            <div>
                <uL>
                    {userWishList.data.products.map(item =>
                        <li
                            className={styles.card__container__listElement}
                            key={item.id}
                        >
                            <WishListItem item={item}/>
                        </li>
                    )}
                </uL>
            </div>
        </MainContainer>
    )
};

export async function getServerSideProps({params}) {
    let token = params.id;
    const baseUrl = `https://bion.biz-mark.ru/api/v1/general`;
    const response = await fetch(`${baseUrl}/wishlist`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const userWishList = await response.json();
// боковая панель
    const responseTwo = await fetch(`${baseUrl}/categories`);
    const array = await responseTwo.json();
    const arrayItems = {
        data: {
            price: {
                min: 0,
                max: 0
            },
        }
    };
    console.log('wish', array, userWishList);
    return {
        props: {userWishList, array, baseUrl, arrayItems}, // will be passed to the page component as props
    }
}