import React from 'react';
import styled from 'styled-components';
import { ThemeColors, extractCanvasThemeColors } from '@sberdevices/plasma-sb-utils';
import { darkEva, darkJoy, darkSber, lightEva, lightJoy, lightSber } from '@sberdevices/plasma-tokens';

import { UIStoryDecorator } from '../helpers';

export default {
    title: 'UI',
    decorators: [UIStoryDecorator],
};

const StyledContainer = styled.div`
    display: flex;
`;

const colors = extractCanvasThemeColors(
    { Sber: darkSber, Athena: darkEva, Joy: darkJoy },
    { Sber: lightSber, Athena: lightEva, Joy: lightJoy },
);

export const Colors = () => {
    return (
        <StyledContainer>
            <ThemeColors style={{ backgroundColor: '#292929' }} colors={colors.dark} title="🌚 Dark Theme Colors" />
            <ThemeColors style={{ backgroundColor: '#FAFAFA' }} colors={colors.light} title="🌝 Light Theme Colors" />
        </StyledContainer>
    );
};
