import React from 'react';
import { accent, primary, tertiary, critical } from '@sberdevices/plasma-tokens';
import * as Icons from '@sberdevices/plasma-icons';
import * as UI from '@sberdevices/plasma-ui';
import { Filler } from '@sberdevices/plasma-docs-ui';

// Add react-live imports you need here
const ReactLiveScope = {
    React,
    Filler,
    accent,
    primary,
    tertiary,
    critical,
    ...Icons,
    ...UI,
    ...React,
};

export default ReactLiveScope;
