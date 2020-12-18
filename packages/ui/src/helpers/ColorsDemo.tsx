import React from 'react';
import styled from 'styled-components';
import { colors, body1, headline3 } from '@sberdevices/plasma-tokens';

const StyledColorsSection = styled.div`
    padding: 20px 0;
`;

const StyledPlate = styled.div`
    display: inline-block;

    padding: 20px 40px;

    vertical-align: top;
`;

const StyledHr = styled.hr`
    margin-bottom: 10px;

    opacity: 0.1;
`;

const ColorsSection: React.FC<{ title: string }> = ({ title, children }) => (
    <StyledColorsSection>
        <h3 style={headline3}>{title}</h3>
        <StyledHr />

        {children}
    </StyledColorsSection>
);

const ColorDemo = styled.div`
    display: inline-block;

    width: 36px;
    height: 36px;
    margin: 16px;

    border-radius: 8px;
`;

const Row = styled.div`
    display: flex;
    align-items: center;

    ${body1}
`;

const baseColors = {
    white: {
        comment: 'Базовый белый цвет совпадает с whitePrimary',
    },
    whitePrimary: {
        comment: 'Первичный белый цвет',
    },
    whiteSecondary: {
        comment: 'Вторичный белый цвет',
    },
    whiteTertiary: {
        comment: 'Третичный белый цвет',
    },

    black: {
        comment: 'Базовый черный цвет совпадает с blackPrimary',
    },
    blackPrimary: {
        comment: 'Первичный черный цвет',
    },
    blackSecondary: {
        comment: 'Вторичный черныйцвет',
    },
    blackTertiary: {
        comment: 'Третичный черный цвет',
    },

    transparent: {
        comment: 'Прозрачный цвет',
    },
};

export const themeColorsComments = {
    accent: 'Акцентный цвет призыва к действию',
    gradient: 'Градиент для заливки основного фона',

    text: 'Базовый цвет текста, совпадает с primary',
    primary: 'Первичный цвет текста',
    secondary: 'Вторичный цвет текста',
    tertiary: 'Третичный цвет текста',

    background: 'Базовый цвет фона, совпадает с backgroundPrimary',
    backgroundPrimary: 'Первичный цвет фона',
    backgroundSecondary: 'Вторичный цвет фона',
    backgroundTertiary: 'Третичный цвет текста',

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
    buttonWarning: 'Цвет предупреждения у контролов',
    buttonCritical: 'Цвет ошибки у контролов',
    buttonChecked: 'Цвет зажатого контрола',
    buttonFocused: 'Цвет рамки фокуса у контрола',

    speechBubbleSent: 'Цвет фона баблов отправленный сообщений',
    speechBubbleReceived: 'Цвет фона баблов получнных сообщений',
};

export const ColorsDemo: React.FC = () => (
    <StyledPlate>
        <ColorsSection title="Цвета Темы">
            {Object.entries(themeColorsComments).map(([name, comment]) => {
                const tokenName = <i>{`--plasma-colors-${name}:`}</i>;
                let style = { backgroundColor: colors[name] };

                if (name === 'gradient') {
                    style = { backgroundImage: colors[name] } as any;
                }

                return (
                    <Row>
                        {tokenName} {'\u00A0'} {comment}: <ColorDemo style={style} />
                    </Row>
                );
            })}
        </ColorsSection>

        <ColorsSection title="Базовые цвета">
            {Object.entries(baseColors).map(([name, val]) => {
                const tokenName = <i>{`--plasma-colors-${name}:`}</i>;
                const style = { backgroundColor: colors[name] };

                return (
                    <Row>
                        {tokenName} {'\u00A0'} {val.comment}: <ColorDemo style={style} />
                    </Row>
                );
            })}
        </ColorsSection>
    </StyledPlate>
);
