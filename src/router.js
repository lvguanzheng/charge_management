import React from 'react';
import ReactDom from 'react-dom';
import { Router } from 'react-router';

import HomePage from './components/home/HomePage'

const routes = {
    path: '/',
    component: HomePage
};

const AppRouter = props => (<Router routes={routes} history={props.history}/>)

export default AppRouter


