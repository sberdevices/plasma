import React, { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { ToastInfo } from './types';
import { Toast } from './Toast';
import { useToast } from './useToast';

const positionMap = {
    horizontal: {
        left: 'left: 1.5rem',
        right: 'right: 1.5rem',
        center: 'left: 50%',
    },
    vertical: {
        top: 'top: 1.5rem',
        bottom: 'bottom: 1.5rem',
    },
};

const showAnimation = keyframes`
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
`;

const StyledRoot = styled.div<{ vertical: string; horizontal: string }>`
    position: fixed;
    ${({ vertical, horizontal }) => css`
        ${positionMap.vertical[vertical as 'top' | 'bottom']};
        ${positionMap.horizontal[horizontal as 'left' | 'center' | 'right']};
        transform: translateX(${horizontal === 'center' ? '-50%' : '0'});
    `};

    animation: 0.3s ${showAnimation} ease-out;
    z-index: 1000;
`;

export const ToastController: React.FC<ToastInfo> = ({ text, position = 'bottom-center', timeout }) => {
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

    const [vertical, horizontal] = position.split('-');

    return (
        <StyledRoot key={toastKey} vertical={vertical} horizontal={horizontal}>
            <Toast text={text} />
        </StyledRoot>
    );
};
