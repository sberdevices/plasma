import React from 'react';
import styled from 'styled-components';

import Story from '../../helpers/Story';

import Icon, { iconSet, IconProps } from './Icon';

const StyledContainer = styled.div`
    padding: 10px;
    display: inline-block;
`;

export default {
    title: 'Icon',
};

export const Default = () => (
    <Story>
        {Object.keys(iconSet).map((icon) => (
            <StyledContainer key={icon}>
                <Icon icon={icon as IconProps['icon']} size="m" />
            </StyledContainer>
        ))}
    </Story>
);

export const Small = () => (
    <Story>
        {Object.keys(iconSet).map((icon) => (
            <StyledContainer key={icon}>
                <Icon icon={icon as IconProps['icon']} size="s" />
            </StyledContainer>
        ))}
    </Story>
);

export const Large = () => (
    <Story>
        {Object.keys(iconSet).map((icon) => (
            <StyledContainer key={icon}>
                <Icon icon={icon as IconProps['icon']} size="l" />
            </StyledContainer>
        ))}
    </Story>
);
