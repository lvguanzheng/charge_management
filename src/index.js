
require('antd/dist/antd.less');

import "babel-polyfill";
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { hashHistory  } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import 'react-hot-loader/patch';

import AppRouter from './router'

const rootEl = document.getElementById('app')
ReactDom.render(
       <AppRouter history={hashHistory}/>
, rootEl);

if (module.hot) {
    module.hot.accept('./router.js', function () {
        const AppRouter = require('./router.js').default;
        ReactDom.render(
            <AppContainer>
                <AppRouter history={hashHistory}/>
            </AppContainer>
        , rootEl);
     });
}
