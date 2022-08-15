import MainContainer from "../component/MainContainer/MainContainer";
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
                <Content
                    urlPage={urlPage}
                    arrayItems={arrayItems}
                    arrayAside={arrayAside}
                    arrayOneItems={arrayOneItems}
                    arrayNavigation={arrayNavigation}/>
        </MainContainer>
    );
}

export async function getServerSideProps({req, params, query}) {
    const baseUrl = `https://bion.biz-mark.ru/api/v1/general`;
    const urlPage = req.url;
    let urlArray = params.slug;

    // работа пагинации
    if (query.page !== undefined && typeof +query.page === 'number') {
        const response = await fetch(`${baseUrl}/categories/${urlArray[urlArray.length - 1]}`);
        const item = await response.json();
        const productsCategoryId = item.data.id;
        const productsCategoryArray = item.data;
        const responseTwo = await fetch(`${baseUrl}/products?page=${query.page}&category=${productsCategoryId}`);
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
            props: {urlPage, arrayItems, arrayAside, productsCategoryId, productsCategoryArray, arrayNavigation}
        }
    }


    ///products?search=${state.settingName}
    const response = await fetch(`${baseUrl}/products?search=${'рука'}`);
    const arrayItems = await response.json();
    console.log('arrrrrrrr', arrayItems)
    //запрос для получения товаров из категории внутри категории
    let arrayNavigation = {
            data: {
                categories: []
            }
        };
    //запрос для боковой панели
    const baseUrlTwo = `https://bion.biz-mark.ru/api/v1/general`;
    const responseThree = await fetch(`${baseUrlTwo}/categories`);
    const arrayAside = await responseThree.json();

    return {
        props: {urlPage, arrayItems, arrayAside, arrayNavigation}
    }
}