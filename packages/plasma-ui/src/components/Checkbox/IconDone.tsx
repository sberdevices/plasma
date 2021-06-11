import React from 'react';
import styled, { css } from 'styled-components';

/**
 * Локальная копия иконки Done, полная сборка
 */

const sizeMap = {
    xs: 1, // 16px
    s: 1.5, // 24px
};

interface IconProps {
    size?: keyof typeof sizeMap;
    color?: string;
    className?: string;
}

const Done: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" {...props}>
        <path
            d="M9 16.2l-3.5-3.5a.984.984 0 00-1.4 0 .984.984 0 000 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7a.984.984 0 000-1.4.984.984 0 00-1.4 0L9 16.2z"
            fill="currentColor"
        />
    </svg>
);

const StyledRoot = styled.div<{ w: string }>`
    display: inline-flex;
    ${({ w }) => css`
        width: ${w};
        height: ${w};
    `}
`;

export const IconDone: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return (
        <StyledRoot w={`${sizeMap[size]}rem`} className={className}>
            <Done color={color} size={size} />
        </StyledRoot>
    );
};
