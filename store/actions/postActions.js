import * as types from '../reducers/types';

let baseUrl = `https://bion.biz-mark.ru/api/v1/general`;
let result = []
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

export const fetchposts = () => async  dispatch => {
    dispatch({
        type:types.GET_POSTS,
        payload:['1st post','2nd post','3 posts']
    })

}

export const fetchpostsTwo = () => async  dispatch => {
    dispatch({
        type:types.API_REQUEST_GENERAL_CATEGORIES,
        payload: {
            result: data.data,
            flagLoad: false
          }
    })

}