import React from 'react';
import styled from 'styled-components';
import { white, backgroundPrimary } from '@sberdevices/plasma-tokens';
import { applyNoSelect } from '@sberdevices/plasma-core';

import { Footnote1 } from '../Typography';

export type ToastProps = {
    text: React.ReactNode;
};

const StyledRoot = styled(Footnote1)`
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.25rem;
    border-radius: 1.25rem;

    background: ${backgroundPrimary};
    color: ${white};
    ${applyNoSelect};
`;

export const Toast: React.FC<ToastProps> = ({ text }) => <StyledRoot>{text}</StyledRoot>;
