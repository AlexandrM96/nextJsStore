import * as types from './types';

const initalState = {
    posts: [],
    post: {},
    loading: false,
    error: null,
    arrayGeneralCategories: [],
    arrayCategories: [],
    arrayCategoryId: [],
    maxPagesPagination: [],
    categoryId: '',
    flagLoad: false,
    pagNum: 1,
    search : '',
    minPrice: 0,
    maxPrice: 9999999
}
export const postReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.GET_POSTS:
            return {
                ...state, posts: action.payload, loading: false, error: null
            }
        case types.API_REQUEST_GENERAL_CATEGORIES:
            const arrayGeneralCategories = action.payload.result.categories;
            state.arrayGeneralCategories.push(arrayGeneralCategories);
            const loadOne = action.payload.flagLoad;
            state.flagLoad = loadOne;
            const newArrayGeneralCategories = [...state.arrayGeneralCategories];
            return {...state, arrayGeneralCategories: newArrayGeneralCategories}
        case  types.API_REQUEST_CATEGORIES:
            if (state.arrayCategories !== []) {
                state.arrayCategories = []
            }
            const arrayCategories = action.payload.result.categories;
            state.arrayCategories.push(arrayCategories);
            const loadTwo = action.payload.flagLoad;
            state.flagLoad = loadTwo;
            const newArrayCategories = [...state.arrayCategories];
            return {...state, arrayCategories: newArrayCategories}
        case types.API_REQUEST_CATEGORY_ADD_ITEMS:
            if (state.arrayCategoryId !== [] || state.maxPagesPagination !== []) {
                state.arrayCategoryId = [];
                state.maxPagesPagination = [];
                state.search = action.payload.search;
                if (action.payload.minPrice !== undefined || action.payload.maxPrice !== undefined) {
                    state.minPrice = action.payload.minPrice;
                    state.maxPrice = action.payload.maxPrice;
                }
            }
            // if((state.action.payload.minPrice !== undefined) || (action.payload.maxPrice !== undefined) || (action.payload.search!== undefined )) {
            //     state.search = action.payload.search;
            //     state.minPrice = action.payload.minPrice;
            //     state.maxPrice = action.payload.maxPrice;
            // }
            const arrayCategoryId = action.payload.result.products;
            const arrayPagination = action.payload.result.pagination.max_pages;
            let countPagination = 0;
            for (let i = 0; i < arrayPagination; i++) {
                countPagination++;
                state.maxPagesPagination.push(countPagination);
            }
            state.arrayCategoryId.push(arrayCategoryId);
            const loadThree = action.payload.flagLoad;
            state.flagLoad = loadThree;
            const newMaxPagesPagination = [...state.maxPagesPagination];
            const newArrayCategoryId = [...state.arrayCategoryId];
            return {...state, arrayCategoryId: newArrayCategoryId, maxPagesPagination: newMaxPagesPagination}
        case types.ADD_ID_CATEGORY:
            if (state.categoryId !== '') {
                state.categoryId = ''
            }
            const categoryId = action.payload.id;
            state.categoryId = categoryId;
            return {...state}
        case types.CHANGING_THE_FLAG:
            const load = action.payload.flagLoad;
            state.flagLoad = load;
            return {...state}
        case types.CHANGING_PAGINATION:
            const pagNum = action.payload.num;
            // console.log(pagNum)
            // state.pagNum = pagNum;
            return {...state, pagNum: pagNum}
        case types.FILTER_PRICE:
            state.minPrice = action.payload.minPrices;
            state.maxPrice = action.payload.maxPrices;
            return {...state}
        default:
            return state
    }
}