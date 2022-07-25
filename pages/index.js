import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Main from '../pages/component/Main/Main';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from '../pages/component/App'

export default function Index() {
  return (
    <body>
      <Provider store={store}>
        <App />
      </Provider>
    </body>
  )
}
