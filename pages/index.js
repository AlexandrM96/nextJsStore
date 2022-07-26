import React from 'react';
import ReactDOM from 'react-dom/client';
import withRedux from "next-redux-wrapper";
import {Provider} from 'react-redux';
import App from '../pages/component/App';


// const root = ReactDOM.hydrate(<App/>, document.getElementById('root'));
export default function Index() {

        return (
                    <App/>
        )
    }

