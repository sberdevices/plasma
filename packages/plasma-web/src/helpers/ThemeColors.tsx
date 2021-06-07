import React from 'react';
import styled from 'styled-components';
import { light, dark } from '@sberdevices/plasma-tokens-web/themes';

import { Headline1, Headline3, Footnote1, Caption } from '../components/Typography';

export const comments = {
    accent: 'Акцентный цвет призыва к действию',
    gradient: 'Градиент для заливки основного фона',

    text: 'Базовый цвет текста, совпадает с primary',
    primary: 'Первичный цвет текста',
    secondary: 'Вторичный цвет текста',
    tertiary: 'Третичный цвет текста',

    white: '',
    whitePrimary: 'Основной, не зависит от темы',
    whiteSecondary: 'Второстепенный, не зависит от темы',
    whiteTertiary: 'Третичный, не зависит от темы',

    black: '',
    blackPrimary: 'Основной чёрный, не зависит от темы',
    blackSecondary: 'Второстепенный чёрный, не зависит от темы',
    blackTertiary: 'Третичный чёрный, не зависит от темы',

    background: 'Базовый цвет фона, совпадает с backgroundPrimary',
    backgroundPrimary: 'Первичный цвет фона',
    backgroundSecondary: 'Вторичный цвет фона',
    backgroundTertiary: 'Третичный цвет текста',

    success: 'Обозначение успешного сценария',
    warning: 'Цвет предупреждения',
    critical: 'Цвет ошибки',

    overlay: 'Цвет фона паранжи',

    surfaceLiquid01: 'Цвет подложки 1',
    surfaceLiquid02: 'Цвет подложки 2',
    surfaceLiquid03: 'Цвет подложки 3',
    surfaceCard: 'Цвет подложки карточек',

    buttonPrimary: 'Первичный цвет контролов',
    buttonSecondary: 'Вторичный цвет контролов',

    buttonAccent: 'Акцентный цвет у контролов',
    buttonSuccess: 'Кнопка для успешного сценария',
    buttonWarning: 'Цвет предупреждения у контролов',
    buttonCritical: 'Цвет ошибки у контролов',
    buttonChecked: 'Цвет зажатого контрола',
    buttonFocused: 'Цвет рамки фокуса у контрола',

    speechBubbleSent: 'Цвет фона баблов отправленный сообщений',
    speechBubbleReceived: 'Цвет фона баблов получнных сообщений',

    voicePhraseGradient: 'Градиент подсказок о голосовых запросах',
};

const themes = {
    light,
    dark,
};

const StyledSwatch = styled.div`
    display: grid;
    grid-template:
        'color name' 1fr
        'color descr' 1fr / 3rem 1fr;
    margin-bottom: 1.25rem;

    &:last-child {
        margin-bottom: 0;
    }
`;
const StyledColor = styled.div`
    grid-area: color;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11);
`;
const StyledVariable = styled(Footnote1)`
    grid-area: name;
    color: ${({ color }) => color};
`;
const StyledName = styled(Footnote1)`
    display: inline;
    color: ${({ color }) => color};
`;
const StyledDescr = styled(Caption)`
    grid-area: descr;
    color: ${({ color }) => color};
`;
const StyledHeadline1 = styled(Headline1)`
    margin-bottom: 1rem;
    color: ${({ color }) => color};
`;
const StyledHeadline3 = styled(Headline3)`
    margin: 2rem 0 1rem;
    color: ${({ color }) => color};
`;

export interface PaletteProps {
    theme?: keyof typeof themes;
    title?: string;
    heading?: string;
}

export const ThemeColors: React.FC<PaletteProps> = ({ theme = 'light', title, heading }) => {
    const selectedTheme = themes[theme][':root'];
    const primary = selectedTheme['--plasma-colors-primary'];
    const items = React.useMemo(() => {
        return Object.entries(selectedTheme).filter(([key]) => key.match(/^--/));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme]);

    return (
        <div>
            {title && <StyledHeadline1 color={primary}>{title}</StyledHeadline1>}
            {heading && <StyledHeadline3 color={primary}>{heading}</StyledHeadline3>}
            {items.map(([key, value]) => {
                const prefix = '--plasma-colors-';
                const name = key.replace(prefix, '') as keyof typeof comments;
                return (
                    <StyledSwatch key={name}>
                        <StyledColor style={{ background: value }} />
                        <StyledVariable style={{ color: selectedTheme['--plasma-colors-secondary'] }}>
                            var({prefix}
                            <StyledName style={{ color: selectedTheme['--plasma-colors-primary'] }}>{name}</StyledName>)
                        </StyledVariable>
                        {comments[name] && (
                            <StyledDescr style={{ color: selectedTheme['--plasma-colors-tertiary'] }}>
                                {comments[name]}
                            </StyledDescr>
                        )}
                    </StyledSwatch>
                );
            })}
        </div>
    );
};

export const ThemeBG = styled.div<{ mode: 'light' | 'dark' }>`
    width: 50%;
    padding: 1rem;
    background: ${({ mode }) => (mode === 'light' ? '#FAFAFA' : '#292929')};
`;
