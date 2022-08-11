import {useSelector, useDispatch} from 'react-redux'
import {fetchpostsThree} from '../../../store/actions/postActions';
import ContentItem from '../ContentItem/ContentItem';
import Image from "next/image";
import Image1 from '../../../public/img/down.png';
import styles from '../../../styles/Content.module.css';
import Link from "next/link";
import React from "react";
import NavigationCategoriesButtons from "../NavigationCategoriesButtons/NavigationCategoriesButtons";

export default function Content(props) {

    const navigationCategoriesArray = props.arrayNavigation.data.categories;

    const newUrl = props.urlPage.split('=').pop();

    console.log(props.urlPage, newUrl)
    // let proc = [];

    // for (let i = 0; i < urlPage.split('=')[1].length; i++) {
    //     if (parseInt(urlPage.split('=')[1][i])) {
    //         proc.push(urlPage.split('=')[1][i]);
    //     }
    // }

    // const urlPagNum = proc.join(''); юыло

    const urlPagNum = 1;

    let countPagination = 0;

    const maxPagesPagination = [];

    for (let i = 0; i < props.arrayItems.data.pagination.max_pages; i++) {
        countPagination++;
        maxPagesPagination.push(countPagination);
    }

    const flagLoad = useSelector((state) => state.post.flagLoad);

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
        <div className={styles.content}>
            <div className={styles.content__container}>
                <ul
                    className={styles.content__container__navigationUl}
                >
                    {navigationCategoriesArray.map(item =>
                        <li
                            className={styles.content__container__navigationUl__li}
                            key={item.index}
                        >
                            <NavigationCategoriesButtons url={props.urlPage} item={item}/>
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
                    {props.arrayItems.data.products.map(item =>
                        <div
                            className={styles.content__containerList}
                            key={item.id}
                        >
                            <ContentItem url={props.urlPage} item={item}/>
                        </div>
                    )}
                </div>
                <div className={styles.content__pages}>
                    <div>
                        <Link href={`/categories/[id]/[...slug]`} as={`${props.urlPage}`}>
                            {/*//page=1*/}
                                <button
                                    className={+urlPagNum >= page.length ? styles.content__pagesButton : styles.content__pagesButton__none}
                                >
                                    В начало
                                </button>
                        </Link>
                    </div>
                    {page.map((page, index) =>
                        <Link href={`/categories/[id]/[...slug]`} as={`${props.urlPage}/page=${page}`}>
                                <div
                                    key={index}
                                    className={+urlPagNum === +page ? styles.content__pagesCount__true : styles.content__pagesCount}
                                >
                                    {page}
                                </div>
                        </Link>
                    )}
                    <div>
                        <Link href={`/categories/[id]/[...slug]`} as={`${props.urlPage}/page=${maxPagesPagination.length}`}>
                                <button
                                    className={+urlPagNum <= maxPagesPagination.length - 3 ? styles.content__pagesButton : styles.content__pagesButton__none}
                                >
                                    В конец
                                </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


