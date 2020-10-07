import React from 'react';
import styled from 'styled-components';

import { Icon, IconProps, iconSet } from './Icon';

const StoryRoot = styled.div`
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

export default {
    title: 'Icon',
};

export const Default = () => (
    <StoryRoot>
        {Object.keys(iconSet).map((icon) => (
            <StyledContainer key={icon}>
                <IconName>{icon}</IconName>
                <Icon icon={icon as IconProps['icon']} size="m" />
            </StyledContainer>
        ))}
    </StoryRoot>
);

export const Small = () => (
    <StoryRoot>
        {Object.keys(iconSet).map((icon) => (
            <StyledContainer key={icon}>
                <IconName>{icon}</IconName>
                <Icon icon={icon as IconProps['icon']} size="s" />
            </StyledContainer>
        ))}
    </StoryRoot>
);

export const Large = () => (
    <StoryRoot>
        {Object.keys(iconSet).map((icon) => (
            <StyledContainer key={icon}>
                <IconName>{icon}</IconName>
                <Icon icon={icon as IconProps['icon']} size="l" />
            </StyledContainer>
        ))}
    </StoryRoot>
);
