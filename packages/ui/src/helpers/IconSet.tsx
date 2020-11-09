import React from 'react';
import styled from 'styled-components';

import { Icon, iconSet, IconProps } from '../components/Icon/Icon';

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

export interface IconSetProps {
    size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
    color?: string;
}

export const IconSet: React.FC<IconSetProps> = ({ size, color }) => {
    return (
        <StyledRoot>
            {Object.keys(iconSet).map((icon) => (
                <StyledContainer key={icon}>
                    <IconName>{`${icon}:${size}`}</IconName>
                    <Icon icon={icon as IconProps['icon']} size={size} color={color} />
                </StyledContainer>
            ))}
        </StyledRoot>
    );
};
