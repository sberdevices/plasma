import React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/App';
import { GlobalStyle } from './GlobalStyle';

ReactDOM.render(
    <>
        <GlobalStyle />
        <App />
    </>,
    document.getElementById('react-page'),
);
