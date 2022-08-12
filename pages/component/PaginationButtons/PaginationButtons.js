import Link from "next/link";
import {useRouter} from "next/router";
import styles from '../../../styles/Content.module.css';

export default function PaginationButtons(props) {

    const router = useRouter();

    let url = router.asPath;

    const newUrlTwo = router.asPath.split('=').shift();

    if (newUrlTwo.split('?').pop() === 'page') {
        let urlArr = url.split('?');
        urlArr.pop();
        url = urlArr[0];
    }

    const urlPagNum = router.query.page === undefined ? 1 : router.query.page;

    let countPagination = 0;

    const maxPagesPagination = [];

    for (let i = 0; i < props.item.arrayItems.data.pagination.max_pages; i++) {
        countPagination++;
        maxPagesPagination.push(countPagination);
    }

    let page = [...maxPagesPagination];

    let newPage = [];

    if (+urlPagNum === (page.length - 1)) {
        for (let i = +urlPagNum; i < (+urlPagNum + 2); i++) {
            newPage.push(i);
        }
    } else if (+urlPagNum === page.length) {
        for (let i = +urlPagNum; i < (+urlPagNum + 1); i++) {
            newPage.push(i);
        }
    } else {
        for (let i = +urlPagNum; i < (+urlPagNum + 3); i++) {
            newPage.push(i);
        }
    }

    +urlPagNum === 1 ? page = [...newPage] : page = [+urlPagNum - 1, ...newPage]

    if (+urlPagNum === undefined) {
        page = [];
    }

    return (
        <div className={styles.content__pages}>
            <div>
                <Link href={`/categories/[id]/[...slug]`} as={`${url}`}>
                    {/*//page=1*/}
                    <button
                        className={+urlPagNum >= page.length ? styles.content__pagesButton : styles.content__pagesButton__none}
                    >
                        В начало
                    </button>
                </Link>
            </div>
            {page.map((page, index) =>
                <button
                    key={index}
                    className={+urlPagNum === +page ? styles.content__pagesCount__true : styles.content__pagesCount}
                    onClick={() => {
                        router.push({
                            pathname: `${url}`,
                            query: {page: page}
                        }).then(r => [])
                    }}
                >
                    {page}
                </button>
            )}
            <div>
                <button
                    className={+urlPagNum <= maxPagesPagination.length - 3 ? styles.content__pagesButton : styles.content__pagesButton__none}
                    onClick={() => {
                        router.push({
                            pathname: `${router.asPath}`,
                            query: {page: maxPagesPagination.length}
                        }).then(r => [])
                    }}
                >
                    В конец
                </button>
            </div>
        </div>
    );
}


