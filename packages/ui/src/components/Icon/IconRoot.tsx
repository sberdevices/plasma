import styled, { css } from 'styled-components';

const sizeMap = {
    s: 24,
    m: 36,
    l: 48,
};

export type IconSize = keyof typeof sizeMap;

export interface IconRootProps {
    icon: string;
    size?: IconSize;
}

export const IconRoot = styled.span<IconRootProps>`
    ${({ icon, size = 'm' }) => css`
        display: inline-block;

        width: ${sizeMap[size]}px;
        height: ${sizeMap[size]}px;

        background-image: url('${icon}');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    `}
`;
