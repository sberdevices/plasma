import React from 'react';
import styled from 'styled-components';

import { Icon, iconSet, IconProps, IconName as IName } from './Icon';
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
    exclude?: Array<IName>;
    include?: Array<IName>;
}

export const IconSet: React.FC<IconSetProps> = ({ size, color, exclude, include }) => {
    return (
        <StyledRoot>
            {Object.keys(iconSet)
                .filter((icon) => {
                    if (exclude) {
                        return !exclude.includes(icon as IName);
                    }
                    return include ? include.includes(icon as IName) : true;
                })
                .map((icon) => (
                    <StyledContainer key={icon}>
                        <IconName>{icon}</IconName>
                        <Icon icon={icon as IconProps['icon']} size={size} color={color} />
                    </StyledContainer>
                ))}
        </StyledRoot>
    );
};
