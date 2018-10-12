import React from 'react';
import ReactDOM from 'react-dom';
import './common/css/reset.scss';
import App from './page/app/index.js';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import themeReducer from './reducer';

const store = createStore(themeReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)