import React from 'react';
import styled from 'styled-components';
import { black, white } from '@sberdevices/plasma-tokens';
import { applyNoSelect } from '@sberdevices/plasma-core';

import { Footnote1 } from '../Typography';

import { ToastRole } from './types';

export type ToastProps = {
    role?: ToastRole;
    text: string;
};

const StyledRoot = styled(Footnote1)`
    display: inline-block;
    padding: 0.75rem 1.25rem;
    border-radius: 1.25rem;

    background: ${black};
    color: ${white};

    ${applyNoSelect};
`;

/**
 * Короткие текстовые подсказки.
 * Вызываются только в текущем запущенном приложении как реакция на выполнение действия пользователем.
 */
export const Toast: React.FC<ToastProps> = ({ role = 'status', text }) => {
    let ariaLive: 'assertive' | 'polite' = 'polite';
    let ariaAtomic = false;

    if (role === 'alert') {
        ariaLive = 'assertive';
    } else if (role === 'status') {
        ariaAtomic = true;
    }

    return (
        <StyledRoot role={role} aria-live={ariaLive} aria-atomic={ariaAtomic}>
            {text}
        </StyledRoot>
    );
};
