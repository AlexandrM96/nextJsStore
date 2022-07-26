import * as types from '../reducers/types';

export  const fetchposts = () => async  dispatch => {
    dispatch({
        type:types.GET_POSTS,
        payload:['1st post','2nd post','3 posts']
    })

}