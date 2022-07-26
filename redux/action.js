
const ApiRequestGeneralCategoriesRedux = {
    type: 'API_REQUEST_GENERAL_CATEGORIES',
    text: 'API REQUEST GENERAL CATEGORIES'
}

const ApiRequestCategoriesRedux = {
    type: 'API_REQUEST_CATEGORIES',
    text: 'API REQUEST CATEGORIES'
}

const ApiRequestCategoriesAddItemsRedux = {
    type: 'API_REQUEST_CATEGORY_ADD_ITEMS',
    text: 'API REQUEST CATEGORY ADD ITEMS'
}

export function addIdCategory(id) {
    return {
        type: 'ADD_ID_CATEGORY',
        payload: {
            id: id
        }
    };
}

export function changingFlag(flag) {
    return {
        type: 'CHANGING_THE_FLAG',
        payload: {
            flagLoad: flag
        }
    };
}

export function changingPagination(num) {
    return {
        type: 'CHANGING_PAGINATION',
        payload: {
            num: num
        }
    };
}