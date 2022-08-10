import {useSelector, useDispatch} from 'react-redux'
import ContentItem from '../component/ContentItem/ContentItem';
import MainContainer from "../component/MainContainer/MainContainer";
import Image from "next/image";
import Image1 from '../../public/img/down.png';
import styles from '../../styles/Content.module.css';
import Link from "next/link";
import React from "react";


export default function Catalog({urlPage, arrayItems, arrayAside, productsCategoryId}) {


    // console.log(arrayItems, urlPage, urlPage.split('='), urlPage.split('=')[1][0]);

    const newUrl = urlPage.split('=').pop();

    let proc = [];

    // for (let i = 0; i < urlPage.split('=')[1].length; i++) {
    //     if (parseInt(urlPage.split('=')[1][i])) {
    //         proc.push(urlPage.split('=')[1][i]);
    //     }
    // }

    const urlPagNum = proc.join('');

    let countPagination = 0;

    const maxPagesPagination = [];

    for (let i = 0; i < arrayItems.data.pagination.max_pages; i++) {
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
        page = [1, 2, 3, 4];
        pagNum = 1;
    }

    return (
        <MainContainer url={urlPage} items={arrayAside.data}>
            <div>
                <div className={styles.content__container}>
                    <div
                        className={!flagLoad ? styles.content__containerLoading__false : styles.content__containerLoading}>
                        <Image src={Image1}
                               height="50"
                               width="50"
                               className={styles.load__img}
                               alt="logo"/>
                    </div>
                    {arrayItems.data.products.map(item =>
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
                        <Link href={`products?page=1&category=${productsCategoryId}`}>
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
                        <Link href={`products?page=${page}&category=${productsCategoryId}`}>
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
                        <Link href={`products?page=${maxPagesPagination.length}&category=${productsCategoryId}`}>
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
        </MainContainer>
    );
}

export async function getServerSideProps({req,params}) {
    //запрос для получения всех товаров по слагу
    const urlPage = req.url;
    const baseUrl = `https://bion.biz-mark.ru/api/v1/general`;
    const response = await fetch(`${baseUrl}${urlPage}`);
    const item = await response.json();
    const productsCategoryId = item.data.id;
    const responseTwo = await fetch(`${baseUrl}/products?category=${productsCategoryId}`);
    const arrayItems = await responseTwo.json();
    // запрос для боковой панели
    const baseUrlTwo = `https://bion.biz-mark.ru/api/v1/general`;
    const responseThree = await fetch(`${baseUrlTwo}/categories`);
    const arrayAside = await responseThree.json();
    return {
        props: {urlPage, arrayItems, arrayAside, productsCategoryId}
    }
}