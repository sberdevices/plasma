import React from 'react';
import styled from 'styled-components';
import { ThemeColors } from '@sberdevices/plasma-sb-utils';
import { light, dark } from '@sberdevices/plasma-tokens-web/themes';

import { WebStoryDecorator } from '../helpers';

export default {
    title: 'Web',
    decorators: [WebStoryDecorator],
};

const StyledContainer = styled.div`
    display: flex;
`;

const extractColors = (theme: Record<string, string>): Record<string, string> =>
    Object.entries(theme)
        .filter(([key]) => key.match(/^--/))
        .reduce((acc, [key, value]) => ({ ...acc, [key.replace('--plasma-colors-', '')]: value }), {});

const lightColors = extractColors(light[':root']);
const darkColors = extractColors(dark[':root']);

export const Colors = () => {
    return (
        <StyledContainer>
            <ThemeColors style={{ backgroundColor: '#FAFAFA' }} colors={lightColors} title="🌝 Light Theme Colors" />
            <ThemeColors style={{ backgroundColor: '#292929' }} colors={darkColors} title="🌚 Dark Theme Colors" />
        </StyledContainer>
    );
};
