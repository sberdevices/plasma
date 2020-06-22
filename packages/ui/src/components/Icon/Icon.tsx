import React from 'react';
import styled, { css } from 'styled-components';

import iconSet from './svg';

const sizeMap = {
    s: 16,
    m: 24,
    l: 32,
    xxl: 72,
} as const;

type IconSize = keyof typeof sizeMap;

export type IconName = keyof typeof iconSet;

interface RootProps {
    icon: IconName;
    size?: IconSize;
}

type IconProps = RootProps;

const StyledRoot = styled.span<{ size: number; icon: IconName }>`
    ${(props) => css`
        display: inline-block;
        background-image: url('${iconSet[props.icon]}');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        display: inline-block;
        width: ${props.size}px;
        height: ${props.size}px;
    `}
`;

export const Icon: React.FC<IconProps> = ({ icon, size = 'm' }) => {
    const iconSize = React.useMemo(() => sizeMap[size], [size]);

    return <StyledRoot icon={icon} size={iconSize} />;
};

export { iconSet };

export default Icon;
