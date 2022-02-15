import React from 'react';
import * as Icons from '@sberdevices/plasma-icons';
import * as Tokens from '@sberdevices/plasma-tokens-b2b';
import * as Web from '@sberdevices/plasma-web';
import { Filler } from '@sberdevices/plasma-docs-ui';
import styled from 'styled-components';

// Add react-live imports you need here
const ReactLiveScope = {
    React,
    Filler,
    styled,
    ...Icons,
    ...Tokens,
    ...Web,
    ...React,
};

export default ReactLiveScope;
