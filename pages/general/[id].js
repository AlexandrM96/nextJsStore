import {useSelector, useDispatch} from 'react-redux'
import ContentItem from '../component/ContentItem/ContentItem';
import Image from "next/image";
import Image1 from '../../public/img/down.png';
import styles from '../../styles/Content.module.css';
import Link from "next/link";
import React from "react";


export default function Content({item, urlPage}) {

    console.log(item, urlPage.split('='), urlPage.split('=')[1][0]);

    const newUrl = urlPage.split('=').pop();

    let proc = [];

    for (let i = 0; i < urlPage.split('=')[1].length; i++) {
        if (parseInt(urlPage.split('=')[1][i])) {
            proc.push(urlPage.split('=')[1][i]);
        }
    }

    const urlPagNum = proc.join('');

    let countPagination = 0;
    const maxPagesPagination = [];
    for (let i = 0; i < item.data.pagination.max_pages; i++) {
        countPagination++;
        maxPagesPagination.push(countPagination);
    }

    const categoryId = useSelector((state) => state.post.categoryId);

    const flagLoad = useSelector((state) => state.post.flagLoad);

    const search = useSelector((state) => state.post.search);

    const minPriсe = useSelector((state) => state.post.minPrice);

    const maxPriсe = useSelector((state) => state.post.maxPrice);

    let pagNum = useSelector((state) => state.post.pagNum);

    let page = [...maxPagesPagination];
    console.log(page)

    let newPage = [];

    if (+urlPagNum === (page.length - 1)) {
        for (let i = +urlPagNum; i < (+urlPagNum + 2); i++) {
            newPage.push(i);
        }
    } else if (pagNum === page.length) {
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
        page = [1, 2, 3, 4];
        pagNum = 1;
    }

    return (
        <div>
            <div className={styles.content__container}>
                <div className={!flagLoad ? styles.content__containerLoading__false : styles.content__containerLoading}>
                    <Image src={Image1}
                           height="50"
                           width="50"
                           className={styles.load__img}
                           alt="logo"/>
                </div>
                {item.data.products.map(item =>
                    <div
                        className={styles.content__containerList}
                        key={item.id}
                    >
                        <ContentItem item={item}/>
                    </div>
                )}
            </div>
            <div className={styles.content__pages}>
                <div>
                    <Link href={`products?page=1&category=${newUrl}`}>
                        <a>
                            <button
                                className={+urlPagNum >= page.length ? styles.content__pagesButton : styles.content__pagesButton__none}
                                // onClick={(e) => dispatch(fetchpostsThree(+categoryId, 1, search, minPriсe, maxPriсe))}
                            >
                                В начало
                            </button>
                        </a>
                    </Link>
                </div>
                {page.map((page, index) =>
                    <Link href={`products?page=${page}&category=${newUrl}`}>
                        <a>
                            <div
                                key={index}
                                className={+urlPagNum === +page ? styles.content__pagesCount__true : styles.content__pagesCount}
                                // onClick={(e) => dispatch(fetchpostsThree(+categoryId, page, search, minPriсe, maxPriсe))}
                            >
                                {page}
                            </div>
                        </a>
                    </Link>
                )}
                <div>
                    <Link href={`products?page=${maxPagesPagination.length - 1}&category=${newUrl}`}>
                        <a>
                            <button
                                className={+urlPagNum <= maxPagesPagination.length - 3 ? styles.content__pagesButton : styles.content__pagesButton__none}
                                // onClick={(e) => dispatch(fetchpostsThree(+categoryId, maxPagesPagination[maxPagesPagination.length - 1], search, minPriсe, maxPriсe))}
                            >
                                В конец
                            </button>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps({req}) {
    const urlPage = req.url;
    const baseUrl = `https://bion.biz-mark.ru/api/v1`;
    const response = await fetch(`${baseUrl}${urlPage}`)
    const item = await response.json()

    return {
        props: {item, urlPage},
    }
}