import React from 'react';
import ReactDOM from 'react-dom';

import Main from '@pages/Main';

import '@client/styles/main.css';

const app = document.getElementById('app');

const render = () => {
    ReactDOM.render(<Main />, app);
};

if (app) render();

if (module.hot) module.hot.accept();
