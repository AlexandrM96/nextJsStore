import store from "../redux/store";
// import { useDispatch } from 'react-redux';
// import { ApiRequestGeneralCategoriesRedux } from '../redux/action';
import {changingFlag, changingPagination} from '../redux/action';
import {useSelector, useDispatch} from 'react-redux';

let baseUrl = `https://bion.biz-mark.ru/api/v1/general`;

export function apiRequestGeneralCategories() {

    fetch(`${baseUrl}/categories`)
        .then((response) => response.json())
        .then((data) => {
                store.dispatch({
                    type: 'API_REQUEST_GENERAL_CATEGORIES',
                    payload: {
                        result: data.data,
                        flagLoad: false
                    }
                })
            }
        )
        .catch((error) => {
            console.error('Error:', error);
        });
}

apiRequestGeneralCategories();

export function apiRequestCategories(item) {

    fetch(`${baseUrl}/categories?categories=${item}`)
        .then((response) => response.json())
        .then((data) => {
                store.dispatch({
                    type: 'API_REQUEST_CATEGORIES',
                    payload: {
                        result: data.data,
                        pagination: data.pagination,
                        flagLoad: false
                    }
                })
            }
        )
        .catch((error) => {
            console.error('Error:', error);
        });
}

export function apiRequestCategoriesAddItems(id, page) {
    store.dispatch({
        type: 'CHANGING_THE_FLAG',
        payload: {
            flagLoad: true
        }
    })
    store.dispatch({
        type: 'CHANGING_PAGINATION',
        payload: {
            num: page
        }
    })
    fetch(`${baseUrl}/products?page=${+page}&category=${id}`)
        .then((response) => response.json())
        .then((data) => {
                console.log('ddddddaaa', data.data)
                store.dispatch({
                    type: 'API_REQUEST_CATEGORY_ADD_ITEMS',
                    payload: {
                        result: data.data,
                        pagination: data.pagination,
                        flagLoad: false
                    }
                })
            }
        )
        .catch((error) => {
            console.error('Error:', error);
        });
}