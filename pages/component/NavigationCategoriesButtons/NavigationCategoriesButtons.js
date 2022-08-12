import Link from "next/link";
import {useRouter} from "next/router";

export default function NavigationCategoriesButtons(props) {
    const router = useRouter();
    const newUrl = props.url.split('/');
    const newUrlTwo = router.asPath.split('=').shift();
    let url = router.asPath;
    if (newUrlTwo.split('?').pop() === 'page') {
        let urlArr = url.split('?');
        urlArr.pop();
        url = urlArr[0] + `/${router.asPath.split('/').pop()}`;
    }
    console.log(newUrl, router, url)
    return (
        <Link href={`/categories/[...slug]`} as={`/${newUrl[1]}/${newUrl[2]}/${newUrl[3]}/${props.item.slug}`}
              prefetch={false}>
            <a>
                {props.item.name}
            </a>
        </Link>
    );
}