import MainContainer from "../component/MainContainer/MainContainer";
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
        <MainContainer url={urlPage} arrayItems={arrayItems} items={arrayAside.data}>
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

    //работа пагинации
    if (query.page !== undefined && typeof +query.page === 'number') {
        const response = await fetch(`${baseUrl}/categories/${urlArray}`);
        const item = await response.json();
        if (!item.status) {
            console.log('не прошел проверку на левые значения');
            return {notFound: true};
        }
        const productsCategoryId = item.data.id;
        const productsCategoryArray = item.data;
        const responseTwo = (query.filter_min_price && query.filter_min_price) !== undefined ?
            await fetch(`${baseUrl}/products?page=${query.page}&category=${productsCategoryId}&[price][min]=${query.filter_min_price}&filter[price][max]=${query.filter_max_price}`)
            :
            await fetch(`${baseUrl}/products?page=${query.page}&category=${productsCategoryId}`);
        const arrayItems = await responseTwo.json();
        //запрос для боковой панели
        const baseUrlTwo = `https://bion.biz-mark.ru/api/v1/general`;
        const responseThree = await fetch(`${baseUrlTwo}/categories`);
        const arrayAside = await responseThree.json();
        return {
            props: {urlPage, arrayItems, arrayAside, productsCategoryId, productsCategoryArray, arrayNavigation, flag}
        }

    }

//работа фильтра
    if (
        ((query.filter_min_price && query.filter_min_price) !== undefined)
        &&
        ((typeof +query.filter_min_price && typeof +query.filter_min_price) === 'number')
    ) {
        const response = await fetch(`${baseUrl}/categories/${urlArray}`);
        const item = await response.json();
        if (!item.status) {
            console.log('не прошел проверку на левые значения');
            return {notFound: true};
        }
        const productsCategoryId = item.data.id;
        const productsCategoryArray = item.data;
        const responseTwo = await fetch(`${baseUrl}/products?category=${productsCategoryId}&filter[price][min]=${query.filter_min_price}&filter[price][max]=${query.filter_max_price}`);
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