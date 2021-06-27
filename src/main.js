/**
 * @file 项目入口文件
 */

import React from 'react';
import './common/css/index.scss';
import 'highlight.js/styles/atom-one-dark.css';
import './common/font/iconfont.css';

import ReactDOM from 'react-dom';
import App from './pages/app/index.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import themeReducer from './reducer';


const store = createStore(themeReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
