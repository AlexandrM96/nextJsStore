import {useRouter} from "next/router";

export default function WishList({userWishList}) {

    const {query} = useRouter()

    console.log(userWishList)
    return (
        <div>
            фывфывфвыфвы
        </div>
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
            'cart': `Bearer ${token}`
        }
    });
    const userWishList = await response.json();
    return {
        props: {userWishList}, // will be passed to the page component as props
    }
}