import React from 'react';
import styled, { css } from 'styled-components';
import { mediaQuery } from '@sberdevices/plasma-core';

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
        --plasma-header-height: 1.75rem; /* 28px */
        --plasma-header-pt: 0.625rem; /* 26px */
        --plasma-header-pb: 0.625rem; /* 10px */
    `,
};

interface StyledHeaderRootProps {
    $size?: keyof typeof sizes;
}

const StyledHeaderRoot = styled.header<StyledHeaderRootProps>`
    position: relative;

    display: flex;
    align-items: center;
    flex-direction: row;

    box-sizing: content-box;

    width: 100%;
    height: var(--plasma-header-height);
    padding-top: var(--plasma-header-pt);
    padding-bottom: var(--plasma-header-pb);

    ${({ $size, theme }) =>
        $size
            ? sizes[$size] // Выберет указанный размер или разложит размеры по брейкпоинтам
            : css`
        ${mediaQuery('S', theme.deviceScale)(sizes.mobile)}
        ${mediaQuery('M', theme.deviceScale)(sizes.sberPortal)}
        ${mediaQuery('L', theme.deviceScale)(sizes.sberBox)}
        ${mediaQuery('XL', theme.deviceScale)(sizes.sberBox)}
    `}
`;

interface HeaderRootProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Задать размер, зависимый от устройства.
     * Если не задан, на каждом брейкпоинте будет свой размер.
     */
    size?: keyof typeof sizes;
}

/**
 * Корневой узел для шапки.
 */
export const HeaderRoot: React.FC<HeaderRootProps> = ({ children, size, ...rest }) => {
    return (
        <StyledHeaderRoot {...rest} $size={size}>
            {children}
        </StyledHeaderRoot>
    );
};
