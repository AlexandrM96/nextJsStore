import React, {useState} from "react";
// import {useEffect} from 'react';
// import {useSelector, useDispatch} from 'react-redux';
// import {apiRequestCategories, apiRequestCategoriesAddItems} from '../../../ApiRequestion/API';
// import ArrayCategoriesItem from '../ArrayCategoriesItem/ArrayCategoriesItem';
// import {changingFlag} from '../../../redux/action';
// import {
//     fetchposts,
//     fetchpostsTwo,
//     fetchpostsThree,
//     fetchpostsFour,
//     fetchpostsSix
// } from '../../../store/actions/postActions';
// import styles from '../../../styles/AsideItem.module.css';

export default function Catalog({urlPage, item}) {
console.log('nenenenenn', urlPage, item)
    return (

        <div>
          sdfsfsdfsdfsdf
        </div>

    );
}

export async function getServerSideProps({req}) {
    const urlPage = req.url;
    const baseUrl = `https://bion.biz-mark.ru/api/v1/general`;
    const response = await fetch(`${baseUrl}${urlPage}`);
    const item = await response.json();
    console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu', urlPage, item);
    // const baseUrlTwo = `https://bion.biz-mark.ru/api/v1/general`;
    // const responseTwo = await fetch(`${baseUrlTwo}/categories`);
    // const array = await responseTwo.json();
    return {
        props: {urlPage, item},
    }
}