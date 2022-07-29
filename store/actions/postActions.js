import * as types from '../reducers/types';

let baseUrl = `https://bion.biz-mark.ru/api/v1/general`;

export const fetchposts = () => async dispatch => {

    fetch(`${baseUrl}/categories`)
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

    fetch(`${baseUrl}/categories`)
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

export const fetchpostsThree = (id, page, search) => async dispatch => {

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

    const api = id === 0 ? `${baseUrl}/products?page=${page}&search=${search}` : `${baseUrl}/products?page=${+page}&category=${id}`;

    fetch(api)
        .then((response) => response.json())
        .then((data) => {
                dispatch({
                    type: types.API_REQUEST_CATEGORY_ADD_ITEMS,
                    payload: {
                        result: data.data,
                        search: search,
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

export const fetchpostsFour = (item) => async dispatch => {

    fetch(`${baseUrl}/categories?categories=${item}`)
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

export const fetchpostsEight = (value) => async dispatch => {

    fetch(`${baseUrl}/products?search=${value}`)
        .then((response) => response.json())
        .then((data) => {
                dispatch({
                    type: types.API_REQUEST_CATEGORY_ADD_ITEMS,
                    payload: {
                        result: data.data,
                        search: value,
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