import * as types from '../reducers/types';

let baseUrl = `https://bion.biz-mark.ru/api/v1/general`;

export const fetchposts = () => async dispatch => {

    const token = localStorage.getItem('tokenAuth');

    fetch(`${baseUrl}/categories`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((response) => response.json())
        .then((data) => {
                dispatch({
                    type: types.GET_POSTS,
                    payload: data.data.categories
                })
            }
        )
        .catch((error) => {
            console.error('Error:', error);
        });
}

export const fetchpostsTwo = () => async dispatch => {

    const token = localStorage.getItem('tokenAuth');

    fetch(`${baseUrl}/categories`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((response) => response.json())
        .then((data) => {
                dispatch({
                    type: types.API_REQUEST_GENERAL_CATEGORIES,
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

export const fetchpostsThree = (id, page, search, minPriсe, maxPriсe) => async dispatch => {

    const token = localStorage.getItem('tokenAuth');

    dispatch({
        type: types.CHANGING_THE_FLAG,
        payload: {
            flagLoad: true
        }
    })

    dispatch({
        type: types.CHANGING_PAGINATION,
        payload: {
            num: page
        }
    })

    const api = id === 0 ?
        `${baseUrl}/products?page=${page}&search=${search}&filter[price][min]=${minPriсe}&filter[price][max]=${maxPriсe}`
        :
        +minPriсe === 0 && +maxPriсe === 9999999 ?
            `${baseUrl}/products?page=${+page}&category=${id}`
            :
            `${baseUrl}/products?page=${+page}&category=${id}&filter[price][min]=${minPriсe}&filter[price][max]=${maxPriсe}`;

    fetch(api, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('dataaaaa', data)
                dispatch({
                    type: types.API_REQUEST_CATEGORY_ADD_ITEMS,
                    payload: {
                        result: data.data,
                        search: search,
                        pagination: data.pagination,
                        flagLoad: false,
                        minPrise: minPriсe,
                        maxPrise: maxPriсe
                    }
                })
            }
        )
        .catch((error) => {
            console.error('Error:', error);
        });
}

export const fetchpostsFour = (item) => async dispatch => {

    const token = localStorage.getItem('tokenAuth');

    fetch(`${baseUrl}/categories?categories=${item}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((response) => response.json())
        .then((data) => {
                dispatch({
                    type: types.API_REQUEST_CATEGORIES,
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

export const fetchpostsFive = () => async dispatch => {

    dispatch({
        type: types.ADD_ID_CATEGORY,
        payload: {
            id: id
        }
    })
}

export const fetchpostsSix = (flag) => async dispatch => {
    dispatch({
        type: types.CHANGING_THE_FLAG,
        payload: {
            flagLoad: flag
        }
    })
}

export const fetchpostsSeven = (num) => async dispatch => {

    dispatch({
        type: types.CHANGING_PAGINATION,
        payload: {
            num: num
        }
    })
}

export const fetchpostsEight = (page, id, value, minPriсe, maxPriсe) => async dispatch => {

    const token = localStorage.getItem('tokenAuth');

    if (minPriсe === '') {
        minPriсe = 0;
    }

    if (maxPriсe === '') {
        maxPriсe = 9999999;
    }

    dispatch({
        type: types.FILTER_PRICE,
        payload: {
            minPrices: minPriсe,
            maxPrices: maxPriсe
        }
    })
    console.log('idddddddddddddddddddddd', id)
    const api = id !== '' ?
        `${baseUrl}/products?page=${+page}&category=${id}&filter[price][min]=${minPriсe}&filter[price][max]=${maxPriсe}`
        :
        `${baseUrl}/products?search=${value}&filter[price][min]=${+minPriсe}&filter[price][max]=${maxPriсe}`;


    fetch(api, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((response) => response.json())
        .then((data) => {
                dispatch({
                    type: types.API_REQUEST_CATEGORY_ADD_ITEMS,
                    payload: {
                        result: data.data,
                        search: value,
                        pagination: data.pagination,
                        flagLoad: false,
                    }
                })
            }
        )
        .catch((error) => {
            console.error('Error:', error);
        });
}