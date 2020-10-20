import React from 'react';
import styled from 'styled-components';
import { text } from '@storybook/addon-knobs';

import { Icon, IconProps, iconSet } from './Icon';
import { IconSet } from './IconSet';

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

export const Default = () => <IconSet />;

export const Small = () => <IconSet size="s" />;

export const Large = () => <IconSet size="l" />;

export const CustomColor = () => {
    const color = text('color', '#fc0');
    return <IconSet color={color} />;
};
