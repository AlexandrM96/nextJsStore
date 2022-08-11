import MainContainer from "../component/MainContainer/MainContainer";
import Item from "../component/Item/Item";
import Content from "../component/Content/Content";

export default function CatalogTwo({
                                       urlPage,
                                       arrayItems,
                                       arrayAside,
                                       arrayOneItems,
                                       arrayNavigation,
                                       flag
                                   }) {

    return (
        <MainContainer url={urlPage} items={arrayAside.data}>
            {flag ?
                <Item item={arrayOneItems}/>
                :
                <Content
                    urlPage={urlPage}
                    arrayItems={arrayItems}
                    arrayAside={arrayAside}
                    arrayOneItems={arrayOneItems}
                    arrayNavigation={arrayNavigation}/>
            }
        </MainContainer>
    );
}

export async function getServerSideProps({req, params}) {
    const baseUrl = `https://bion.biz-mark.ru/api/v1/general`;
    const urlPage = req.url;
    const newUrlPage = urlPage.split('/').pop();
    let flag = false;
    let urlArray = params.slug;
    let itemsArray = [];

    // работа пагинации
    if (newUrlPage.split('=').shift() === 'page') {
        const response = await fetch(`${baseUrl}/categories/${urlArray[urlArray.length - 2]}`);
        const item = await response.json();
        const productsCategoryId = item.data.id;
        const productsCategoryArray = item.data;
        const responseTwo = await fetch(`${baseUrl}/products?page=${newUrlPage.split('=').pop()}&category=${productsCategoryId}`);
        const arrayItems = await responseTwo.json();
        //запрос для получения товаров из категории внутри категории
        const str = productsCategoryArray.children_id_list.join('|');
        const responseFour = await fetch(`${baseUrl}/categories?categories=${str}`);
        let arrayNavigation = await responseFour.json();
        if (productsCategoryArray.children_id_list.length === 0) {
            arrayNavigation = {
                data: {
                    categories: []
                }
            }
        }
        //запрос для боковой панели
        const baseUrlTwo = `https://bion.biz-mark.ru/api/v1/general`;
        const responseThree = await fetch(`${baseUrlTwo}/categories`);
        const arrayAside = await responseThree.json();
        return {
            props: {urlPage, arrayItems, arrayAside, productsCategoryId, productsCategoryArray, arrayNavigation, flag}
        }

    }


    // страница одного товара
    if (urlArray.length > 3 && newUrlPage.split('=').shift() !== 'page') {
        //проверка на левые значения при условии страницы с одним товаром
        for (let i = 0; i < urlArray.length - 1; i++) {
            const response = await fetch(`${baseUrl}/categories/${urlArray[i]}`);
            const items = await response.json();
            if (!items.status) {
                console.log('не прошел проверку на левые значения');
                return {notFound: true};
            }
            itemsArray.push(items);
        }
        //проверка на ветку категорий при условии страницы с одним товаром
        for (let i = 0; i < itemsArray.length - 1; i++) {
            if (itemsArray[i].data.parent_id !== null) {
                if (itemsArray[i - 1].data.id !== itemsArray[i].data.parent_id) {
                    console.log('не прошел проверку на ветку категорий');
                    return {notFound: true};
                }
            }
        }
        flag = true;
        const response = await fetch(`${baseUrl}/products/${urlArray[urlArray.length - 1]}`);
        const arrayOneItems = await response.json();
        if (itemsArray[itemsArray.length - 1].data.id !== arrayOneItems.data.category_id) {
            console.log('не прошел проверку на ветку категорий и родительсуую ветку одного товара');
            return {notFound: true};
        }
        //запрос для боковой панели
        const baseUrlTwo = `https://bion.biz-mark.ru/api/v1/general`;
        const responseThree = await fetch(`${baseUrlTwo}/categories`);
        const arrayAside = await responseThree.json();
        let productsCategoryId = []
        let productsCategoryArray = []
        let arrayNavigation = {
            data: {
                categories: []
            }
        }
        let arrayItems = {
            data: {
                pagination: {
                    "count": 1,
                    "max_pages": 1,
                    "per_page": 1
                }
            }
        }
        return {
            props: {
                urlPage,
                arrayItems,
                arrayAside,
                productsCategoryId,
                productsCategoryArray,
                arrayNavigation,
                flag,
                arrayOneItems
            }
        }
    }


    //проверка на левые значения
    for (let i = 0; i < urlArray.length; i++) {
        const response = await fetch(`${baseUrl}/categories/${urlArray[i]}`);
        const items = await response.json();
        if (!items.status) {
            console.log('не прошел проверку на левые значения');
            return {notFound: true};
        }
        itemsArray.push(items);
    }
    //проверка на ветку категорий
    for (let i = 0; i < itemsArray.length; i++) {
        if (itemsArray[i].data.parent_id !== null) {
            if (itemsArray[i - 1].data.id !== itemsArray[i].data.parent_id) {
                console.log('не прошел проверку на ветку категорий');
                return {notFound: true};
            }
        }
    }
    // строка для теста / web-kamery-kolonki-naushniki-mikrofony / kolonki / kolonki-jbl
    //запрос для получения всех товаров по одной категории по слагу
    const response = await fetch(`${baseUrl}/categories/${newUrlPage}`);
    const item = await response.json();
    const productsCategoryId = item.data.id;
    const productsCategoryArray = item.data;
    const responseTwo = await fetch(`${baseUrl}/products?category=${productsCategoryId}`);
    const arrayItems = await responseTwo.json();
    //запрос для получения товаров из категории внутри категории
    const str = productsCategoryArray.children_id_list.join('|');
    const responseFour = await fetch(`${baseUrl}/categories?categories=${str}`);
    let arrayNavigation = await responseFour.json();
    if (productsCategoryArray.children_id_list.length === 0) {
        arrayNavigation = {
            data: {
                categories: []
            }
        }
    }
    //запрос для боковой панели
    const baseUrlTwo = `https://bion.biz-mark.ru/api/v1/general`;
    const responseThree = await fetch(`${baseUrlTwo}/categories`);
    const arrayAside = await responseThree.json();
    return {
        props: {urlPage, arrayItems, arrayAside, productsCategoryId, productsCategoryArray, arrayNavigation, flag}
    }
}