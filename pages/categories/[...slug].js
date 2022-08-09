// import {useSelector, useDispatch} from 'react-redux'
// import ContentItem from '../component/ContentItem/ContentItem';
// import MainContainer from "../component/MainContainer/MainContainer";
// import Image from "next/image";
// import Image1 from '../../public/img/down.png';
// import styles from '../../styles/Content.module.css';
// import Link from "next/link";
import React from "react";
import styles from "../../styles/Content.module.css";
import Image from "next/image";
import Image1 from "../../public/img/down.png";
import ContentItem from "../component/ContentItem/ContentItem";
import Link from "next/link";
import MainContainer from "../component/MainContainer/MainContainer";
import NavigationCategoriesButtons from '../component/NavigationCategoriesButtons/NavigationCategoriesButtons';
import {useSelector} from "react-redux";


export default function CatalogTwo({
                                       urlPage,
                                       arrayItems,
                                       arrayAside,
                                       productsCategoryId,
                                       productsCategoryArray,
                                       arrayNavigation
                                   }) {

    console.log('nenenenenn', urlPage, arrayItems, arrayAside, productsCategoryId, productsCategoryArray, arrayNavigation)

    const navigationCategoriesArray = arrayNavigation.data.categories;
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
    console.log(page)

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
            <div className={styles.content__container}>
                <ul
                    className={styles.content__container__navigationUl}
                >
                    {navigationCategoriesArray.map(item =>
                        <li
                            className={styles.content__container__navigationUl__li}
                            key={item.index}
                        >
                            <NavigationCategoriesButtons url={urlPage} item={item}/>
                        </li>
                    )}
                </ul>
                <div>
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

export async function getServerSideProps({req, params}) {
    //запрос для получения всех товаров по одной категории по слагу
    const urlPage = req.url;
    const newUrlPage = urlPage.split('/').pop();
    const baseUrl = `https://bion.biz-mark.ru/api/v1/general`;
    const response = await fetch(`${baseUrl}/categories/${newUrlPage}`);
    const item = await response.json();
    const productsCategoryId = item.data.id;
    const productsCategoryArray = item.data;
    const responseTwo = await fetch(`${baseUrl}/products?category=${productsCategoryId}`);
    const arrayItems = await responseTwo.json();
    //запрос для получения товаров из категории внутри категории
    const str = productsCategoryArray.children_id_list.join('|');
    //сравнить по строке str
    const responseFour = await fetch(`${baseUrl}/categories?categories=${str}`);
    let arrayNavigation = await responseFour.json();
    //запрос для боковой панели
    const baseUrlTwo = `https://bion.biz-mark.ru/api/v1/general`;
    const responseThree = await fetch(`${baseUrlTwo}/categories`);
    const arrayAside = await responseThree.json();
    console.log('sadasdasdadsasdadsadsasdddcccccc',str, arrayNavigation)
    if (productsCategoryArray.children_id_list !== []) {
        return {
            props: {urlPage, arrayItems, arrayAside, productsCategoryId, productsCategoryArray, arrayNavigation}
        }
    }
}