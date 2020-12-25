import React, { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { ToastInfo } from './types';
import { Toast } from './Toast';
import { useToast } from './useToast';

const showAnimation = keyframes`
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
`;

const StyledRoot = styled.div<{ vertical: string }>`
    position: fixed;
    left: 50%;
    transform: translateX(-50%);

    ${({ vertical }) => css`
        ${vertical}: 1.5rem;
    `};

    animation: 0.3s ${showAnimation} ease-out;
    z-index: 1000;
`;

export const ToastController: React.FC<ToastInfo> = ({ text, position = 'bottom', timeout }) => {
    const toastKey = `${text}${position}`;

    const { hideToast } = useToast();

    useEffect(() => {
        if (!text || timeout === null) {
            return undefined;
        }
        const hideTimeout = setTimeout(() => {
            hideToast();
        }, timeout);

        return () => clearTimeout(hideTimeout);
    }, [toastKey, text, timeout]);

    if (!text || !position) {
        return null;
    }

    return (
        <StyledRoot key={toastKey} vertical={position}>
            <Toast text={text} />
        </StyledRoot>
    );
};
