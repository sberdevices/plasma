import React from 'react';
import styled from 'styled-components';
import { background } from '@sberdevices/plasma-tokens';

import { Footnote1 } from '../Typography';

export type ToastProps = {
    text: string;
};

const StyledRoot = styled.div`
    display: inline-block;
    padding: 0.75rem 1.25rem;
    border-radius: 1.25rem;

    background: ${background};
`;

export const Toast: React.FC<ToastProps> = ({ text }) => (
    <StyledRoot>
        <Footnote1>{text}</Footnote1>
    </StyledRoot>
);
