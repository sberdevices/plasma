import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { ToastInfo } from './types';
import { Toast } from './Toast';
import { useToast } from './useToast';

const showAnimation = (position: string) => keyframes`
    0% {
        transform: translate(-50%, ${position === 'top' && '-'}5rem);
        opacity: 0;
    }

    80% {
        transform: translate(-50%, 0);
        opacity: 0.7;
    }

    100% {
        opacity: 1;
    }
`;
const hideAnimation = (position: string) => keyframes`
    0% {
        opacity: 1;
    }

    20% {
        transform: translate(-50%, 0);
        opacity: 0.7;
    }

    100% {
        transform: translate(-50%, ${position === 'top' && '-'}5rem);
        opacity: 0;
    }
`;

const StyledRoot = styled.div<{ position: string; isVisible: boolean }>`
    position: fixed;
    left: 50%;
    z-index: 1000;
    transform: translateX(-50%);

    ${({ position, isVisible }) => css`
        ${position}: 5rem;
        animation: 300ms ${isVisible ? showAnimation(position) : hideAnimation(position)};
    `};
`;

/**
 * Создаёт <div />, который внутри себя содержит тост.
 * Цикл: show => timeout => hide.
 */
export const ToastController: React.FC<ToastInfo> = ({ text, position = 'bottom', timeout }) => {
    const { hideToast } = useToast();
    const [isVisible, setIsVisible] = useState(true);
    const hideTimeout = useRef<number | null>(null);
    const toastKey = `${text}${position}`;

    const animationEndHandler = useCallback(() => {
        if (!isVisible) {
            hideToast();
            setIsVisible(true); // Необходимо вернуть булево к следующему вызову тоста
        }
        if (isVisible) {
            hideTimeout.current = setTimeout(() => {
                setIsVisible(false);
            }, timeout);
        }
    }, [timeout, isVisible]);

    useEffect(() => {
        return () => {
            if (hideTimeout.current !== null) {
                clearTimeout(hideTimeout.current);
            }
        };
    }, []);

    if (!text || !position) {
        return null;
    }

    return (
        <StyledRoot key={toastKey} position={position} isVisible={isVisible} onAnimationEnd={animationEndHandler}>
            <Toast text={text} />
        </StyledRoot>
    );
};
