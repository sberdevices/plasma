import React from 'react';
import styled from 'styled-components';

import { Icon, iconSet, IconProps } from './Icon';
import { IconSize } from './IconRoot';

const StyledRoot = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    margin: 10px;
`;

const IconName = styled.div`
    padding-bottom: 8px;
`;

interface IconSetProps {
    size?: IconSize;
    color?: string;
}

export const IconSet: React.FC<IconSetProps> = ({ size, color }) => {
    return (
        <StyledRoot>
            {Object.keys(iconSet).map((icon) => (
                <StyledContainer key={icon}>
                    <IconName>{icon}</IconName>
                    <Icon icon={icon as IconProps['icon']} size={size} color={color} />
                </StyledContainer>
            ))}
        </StyledRoot>
    );
};
