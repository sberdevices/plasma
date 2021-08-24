import React from 'react';
import styled from 'styled-components';
import { accent, primary, tertiary, critical, surfaceLiquid01, SpacingProps } from '@sberdevices/plasma-core';
import * as Icons from '@sberdevices/plasma-icons';
import * as UI from '@sberdevices/plasma-ui';

const Filler = styled.div<SpacingProps>`
    ${UI.applySpacing}

    display: flex;
    align-items: center;
    justify-content: center;

    box-sizing: border-box;

    width: 100%;
    padding: 0.5rem 1rem;

    background-color: ${surfaceLiquid01};
`;

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
