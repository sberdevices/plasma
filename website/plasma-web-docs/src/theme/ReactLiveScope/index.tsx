import React from 'react';
import * as Icons from '@sberdevices/plasma-icons';
import * as Tokens from '@sberdevices/plasma-tokens-web';
import * as Web from '@sberdevices/plasma-web';

// Add react-live imports you need here
const ReactLiveScope = {
    React,
    ...Icons,
    ...Tokens,
    ...Web,
    ...React,
};

export default ReactLiveScope;
