import {Provider} from 'react-redux';
import store from '../redux/store';
import App from 'next/app';
import React, {useState, useEffect} from "react";
import {createWpapper} from 'next-redux-wrapper';

import '../styles/globals.css';


export default function MyApp({Component, pageProps}) {

    return (

            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>

    );

}