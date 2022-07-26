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
    pagNum: 1
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
            console.log(arrayGeneralCategories)
            return { ...state, arrayGeneralCategories: newArrayGeneralCategories }
        default:
            return state
    }
}