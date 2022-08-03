import {useRouter} from "next/router";
import CardItem from "./component/CardItem/CardItem";
import styles from '../styles/Card.module.css';

export default function WishList({userWishList}) {

    const {query} = useRouter()

    return (
        <div className={styles.card}>
            фывфывфвыфвы
        </div>
    )
};

export async function getServerSideProps({params}) {
    const baseUrl = `https://bion.biz-mark.ru/api/v1/general/wishlist`;
    const response = await fetch(baseUrl);
    const userWishList = await response.json();
    return {
        props: {userWishList}, // will be passed to the page component as props
    }
}