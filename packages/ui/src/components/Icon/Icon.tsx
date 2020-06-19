import React from 'react';
import styled from 'styled-components';

import iconSet from './svg';

export type IconName = keyof typeof iconSet;

interface RootProps {
    icon: IconName;
    size?: '16' | '24' | '32' | '72';
}

type IconProps = RootProps;

const StyledRoot = styled.span<RootProps>`
    display: inline-block;
    background-image: url('${(props) => iconSet[props.icon]}');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    display: inline-block;
    ${(props) => `
        width: ${props.size}px;
        height: ${props.size}px;
    `}
`;

const Icon: React.FC<IconProps> = ({ icon, size = '24' }) => <StyledRoot icon={icon} size={size} />;

export { iconSet };

export default Icon;
