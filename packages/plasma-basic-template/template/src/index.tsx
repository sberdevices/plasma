import React from 'react';
import { render } from 'react-dom';
import '@sberdevices/spatial-navigation';

import { App } from './App';

render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.querySelector('#root'),
);
