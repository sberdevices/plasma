import React from 'react';
import styled, { css } from 'styled-components';
import { mediaQuery } from '@sberdevices/plasma-core';
import Color from 'color';

import { ThemeProviderValue } from '../Device/DeviceDetection';

const sizes = {
    sberBox: css`
        --plasma-header-height: 2.25rem; /* 36px */
        --plasma-header-pt: 1.875rem; /* 30px */
        --plasma-header-pb: 0.875rem; /* 14px */
    `,
    sberPortal: css`
        --plasma-header-height: 2.25rem; /* 36px */
        --plasma-header-pt: 1.625rem; /* 26px */
        --plasma-header-pb: 0.625rem; /* 10px */
    `,
    mobile: css`
        --plasma-header-height: 2.25rem; /* 36px */
        --plasma-header-pt: 0.375rem; /* 6px */
        --plasma-header-pb: 0.375rem; /* 6px */
    `,
};

interface StyledHeaderRootProps {
    $size?: keyof typeof sizes;
    $gradientColor?: string;
}

const StyledHeaderRoot = styled.header<StyledHeaderRootProps>`
    box-sizing: content-box;

    width: 100%;
    height: var(--plasma-header-height);
    padding-top: var(--plasma-header-pt);
    padding-bottom: var(--plasma-header-pb);

    ${({ $size, theme }: { theme: ThemeProviderValue; $size?: keyof typeof sizes }) =>
        $size
            ? sizes[$size] // Выберет указанный размер или разложит размеры по брейкпоинтам
            : css`
        ${mediaQuery('S', theme.deviceScale)(sizes.mobile)}
        ${mediaQuery('M', theme.deviceScale)(sizes.sberPortal)}
        ${mediaQuery('L', theme.deviceScale)(sizes.sberBox)}
        ${mediaQuery('XL', theme.deviceScale)(sizes.sberBox)}
    `}

    ${({ $gradientColor }) =>
        $gradientColor &&
        css`
            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: calc(var(--plasma-header-height) + var(--plasma-header-pt) + var(--plasma-header-pb));
                background-image: linear-gradient(
                    180deg,
                    ${$gradientColor},
                    ${Color($gradientColor).alpha(0).string()}
                );
            }
        `}
`;
const StyledInner = styled.div`
    position: relative;

    display: flex;
    align-items: center;
    flex-direction: row;

    width: 100%;
    height: 100%;
`;

export interface HeaderRootProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Задать размер, зависимый от устройства.
     * Если не задан, на каждом брейкпоинте будет свой размер.
     */
    size?: keyof typeof sizes;
    /**
     * Цвет для создания градиента сверху вниз.
     * Указаный цвет займет верхнюю точку градента,
     * а его, рассчитываемая программно, прозрачная версия - нижнюю.
     * Можно использовать hex, rgb и rgba значения цвета.
     */
    gradientColor?: string;
}

/**
 * Корневой узел для шапки.
 */
export const HeaderRoot: React.FC<HeaderRootProps> = ({ children, size, gradientColor, ...rest }) => {
    return (
        <StyledHeaderRoot {...rest} $size={size} $gradientColor={gradientColor}>
            <StyledInner>{children}</StyledInner>
        </StyledHeaderRoot>
    );
};
