import React from 'react';
import styled from 'styled-components';
import { ThemeColors } from '@sberdevices/plasma-sb-utils';
import { darkEva, darkJoy, darkSber, lightEva, lightJoy, lightSber } from '@sberdevices/plasma-tokens';

import { UIStoryDecorator } from '../helpers';

export default {
    title: 'UI',
    decorators: [UIStoryDecorator],
};

const StyledContainer = styled.div`
    display: flex;
`;

const extractColors = (theme: Record<string, string>, suffix: string): Record<string, string> =>
    Object.entries(theme)
        .filter(([key]) => key.match(/^--/))
        .reduce((acc, [key, value]) => {
            let name = key.replace('--plasma-colors-', '');
            switch (name) {
                case 'accent':
                    name = `accent${suffix}`;
                    break;
                case 'voicePhraseGradient':
                    name = `voicePhraseGradient${suffix}`;
                    break;
                case 'buttonAccent':
                    name = `buttonAccent${suffix}`;
                    break;
                case 'gradient':
                    name = `gradient${suffix}`;
                    break;
                default:
                    break;
            }
            return { ...acc, [name]: value };
        }, {});

const colors = {
    darkSber: extractColors(darkSber[':root'], 'Sber'),
    darkAthena: extractColors(darkEva[':root'], 'Athena'),
    darkJoy: extractColors(darkJoy[':root'], 'Joy'),
    lightSber: extractColors(lightSber[':root'], 'Sber'),
    lightAthena: extractColors(lightEva[':root'], 'Athena'),
    lightJoy: extractColors(lightJoy[':root'], 'Joy'),
};

const dark: Record<keyof typeof darkSber | string, string> = {
    ...colors.darkSber,
    accentAthena: colors.darkAthena.accentAthena,
    voicePhraseGradientAthena: colors.darkAthena.voicePhraseGradientAthena,
    buttonAccentAthena: colors.darkAthena.buttonAccentAthena,
    gradientAthena: colors.darkAthena.gradientAthena,
    accentJoy: colors.darkJoy.accentJoy,
    voicePhraseGradientJoy: colors.darkJoy.voicePhraseGradientJoy,
    buttonAccentJoy: colors.darkJoy.buttonAccentJoy,
    gradientJoy: colors.darkJoy.gradientJoy,
};
const light: Record<keyof typeof lightSber | string, string> = {
    ...colors.lightSber,
    accentAthena: colors.lightAthena.accentAthena,
    voicePhraseGradientAthena: colors.lightAthena.voicePhraseGradientAthena,
    buttonAccentAthena: colors.lightAthena.buttonAccentAthena,
    gradientAthena: colors.lightAthena.gradientAthena,
    accentJoy: colors.lightJoy.accentJoy,
    voicePhraseGradientJoy: colors.lightJoy.voicePhraseGradientJoy,
    buttonAccentJoy: colors.lightJoy.buttonAccentJoy,
    gradientJoy: colors.lightJoy.gradientJoy,
};

export const Colors = () => {
    return (
        <StyledContainer>
            <ThemeColors style={{ backgroundColor: '#292929' }} colors={dark} title="🌚 Dark Theme Colors" />
            <ThemeColors style={{ backgroundColor: '#FAFAFA' }} colors={light} title="🌝 Light Theme Colors" />
        </StyledContainer>
    );
};
