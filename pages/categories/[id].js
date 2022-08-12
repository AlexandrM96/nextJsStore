import {useSelector, useDispatch} from 'react-redux'
import ContentItem from '../component/ContentItem/ContentItem';
import MainContainer from "../component/MainContainer/MainContainer";
import Image from "next/image";
import Image1 from '../../public/img/down.png';
import styles from '../../styles/Content.module.css';
import Link from "next/link";
import React from "react";
import Content from "../component/Content/Content";


export default function Catalog({
                                    urlPage,
                                    arrayItems,
                                    arrayAside,
                                    arrayNavigation,
                                    arrayOneItems
                                }) {

    return (
        <MainContainer url={urlPage} items={arrayAside.data}>
            <div>
                <Content
                    urlPage={urlPage}
                    arrayItems={arrayItems}
                    arrayAside={arrayAside}
                    arrayOneItems={arrayOneItems}
                    arrayNavigation={arrayNavigation}/>
            </div>
        </MainContainer>
    );
}

export async function getServerSideProps({req, params, query}) {
    //запрос для получения всех товаров по слагу
    const baseUrl = `https://bion.biz-mark.ru/api/v1/general`;
    const urlPage = req.url;
    const newUrlPage = urlPage.split('/').pop();
    let flag = false;
    let urlArray = params.id;
    let itemsArray = [];
    const arrayNavigation = {
        data: {
            categories: []
        }
    }
    if (query.page !== undefined && typeof +query.page === 'number') {
        const response = await fetch(`${baseUrl}/categories/${urlArray}`);
        const item = await response.json();
        const productsCategoryId = item.data.id;
        const productsCategoryArray = item.data;
        const responseTwo = await fetch(`${baseUrl}/products?page=${query.page}&category=${productsCategoryId}`);
        const arrayItems = await responseTwo.json();
        //запрос для боковой панели
        const baseUrlTwo = `https://bion.biz-mark.ru/api/v1/general`;
        const responseThree = await fetch(`${baseUrlTwo}/categories`);
        const arrayAside = await responseThree.json();
        return {
            props: {urlPage, arrayItems, arrayAside, productsCategoryId, productsCategoryArray, arrayNavigation, flag}
        }

    }


    const response = await fetch(`${baseUrl}${urlPage}`);
    const item = await response.json();
    if (!item.status) {
        return {notFound: true};
    }
    const productsCategoryId = item.data.id;
    const responseTwo = await fetch(`${baseUrl}/products?category=${productsCategoryId}`);
    const arrayItems = await responseTwo.json();
    // запрос для боковой панели
    const baseUrlTwo = `https://bion.biz-mark.ru/api/v1/general`;
    const responseThree = await fetch(`${baseUrlTwo}/categories`);
    const arrayAside = await responseThree.json();
    return {
        props: {urlPage, arrayItems, arrayAside, productsCategoryId, arrayNavigation, flag}
    }
}