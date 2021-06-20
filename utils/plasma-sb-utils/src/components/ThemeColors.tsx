import React from 'react';
import styled, { css } from 'styled-components';
import { Headline1, Headline3, Footnote1, Caption, applyEllipsis } from '@sberdevices/plasma-core';
import { paramCase } from 'param-case';

const NONE = 'NONE';
const comments = {
    accent: 'Акцентный цвет бренда',
    accentSber: 'Акцентный цвет Сбера',
    accentAthena: 'Акцентный цвет Афины',
    accentJoy: 'Акцентный цвет Джой',

    gradient: 'Акцентный градиент бренда',

    voicePhraseGradient: 'Градиент подсказок о голосовых запросах',
    voicePhraseGradientSber: 'Голосовые фразы Сбера',
    voicePhraseGradientAthena: 'Голосовые фразы Афины',
    voicePhraseGradientJoy: 'Голосовые фразы Джой',

    text: 'Базовый цвет текста, совпадает с primary',
    primary: 'Основной текст в интерфейсе',
    secondary: 'Второстепенный текст',
    tertiary: 'Третичный цвет текста',

    white: 'Основной белый, не зависит от темы',
    whitePrimary: 'Основной белый, не зависит от темы',
    whiteSecondary: 'Второстепенный белый',
    whiteTertiary: 'Третичный белый',

    black: 'Основной чёрный, не зависит от темы',
    blackPrimary: 'Основной чёрный, не зависит от темы',
    blackSecondary: 'Второстепенный чёрный',
    blackTertiary: 'Третичный чёрный',

    background: 'Основной бэкграунд всех приложений и смартапов',
    backgroundPrimary: 'Первичный цвет фона',
    backgroundSecondary: 'Вторичный цвет фона',
    backgroundTertiary: 'Третичный цвет текста',

    gradientSber: 'Бэкграунд ассистента для Сбера',
    gradientAthena: 'Бэкграунд ассистента для Афины',
    gradientJoy: 'Бэкграунд ассистента для Джой',

    success: 'Обозначение успешного сценария',
    warning: 'Цвет предупреждения',
    critical: 'Цвет ошибки',

    overlay: 'Цвет фона паранжи',

    surfaceLiquid01: 'Полупрозрачные поверхности',
    surfaceLiquid02: 'Полупрозрачные поверхности',
    surfaceLiquid03: 'Полупрозрачные поверхности',
    surfaceSolid01: 'Непрозрачные поверхности',
    surfaceSolid02: 'Непрозрачные поверхности',
    surfaceSolid03: 'Непрозрачные поверхности',
    surfaceCard: 'Основной фон для карточек',

    buttonAccent: 'Основная брендовая кнопка',
    buttonAccentSber: 'Основная кнопка для Сбера',
    buttonAccentAthena: 'Основная кнопка для Афины',
    buttonAccentJoy: 'Основная кнопка для Джой',
    buttonSecondary: 'Вторичный цвет контролов',

    buttonSuccess: 'Кнопка для успешного сценария',
    buttonWarning: 'Цвет предупреждения у контролов',
    buttonCritical: 'Цвет ошибки у контролов',
    buttonChecked: 'Цвет зажатого контрола',
    buttonFocused: 'Цвет рамки фокуса у контрола',

    speechBubbleSent: 'Цвет фона баблов отправленный сообщений',
    speechBubbleReceived: 'Цвет фона баблов получнных сообщений',

    [NONE]: '', // Для пропусков
};

export type Name = keyof typeof comments;
type Color = { name: Name; title: string; style?: object };
type Group = Array<Color>;
type SectionType = 'swatch' | 'card';
type Section = { title: string; subtitle: string; type: SectionType; groups: Array<Group> };

const styles = {
    cardShadow: { boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.05), 0px 4px 14px rgba(0, 0, 0, 0.08)' },
};
const sections: Section[] = [
    {
        title: 'Text & Icons',
        subtitle: 'Набор цветов для текстов и иконок',
        type: 'swatch',
        groups: [
            [
                { name: 'primary', title: 'Primary' },
                { name: 'secondary', title: 'Secondary' },
                { name: 'tertiary', title: 'Tertiary' },
            ],
            [
                { name: 'whitePrimary', title: 'Glbl White / Primary' },
                { name: 'whiteSecondary', title: 'Glbl White / Secondary' },
                { name: 'whiteTertiary', title: 'Glbl White / Tertiary' },
            ],
            [
                { name: 'blackPrimary', title: 'Glbl Black / Primary' },
                { name: 'blackSecondary', title: 'Glbl Black / Secondary' },
                { name: 'blackTertiary', title: 'Glbl Black / Tetriary' },
            ],
            [
                { name: 'accent', title: 'Accent / Brand' },
                { name: 'accentSber', title: 'Accent / Sber' },
                { name: 'accentAthena', title: 'Accent / Athena' },
                { name: 'accentJoy', title: 'Accent / Joy' },
            ],
            [
                { name: 'gradient', title: 'Gradient / Brand' },
                { name: 'voicePhraseGradientSber', title: 'Gradient / Sber' },
                { name: 'voicePhraseGradientAthena', title: 'Gradient / Athena' },
                { name: 'voicePhraseGradientJoy', title: 'Gradient / Joy' },
            ],
            [
                { name: 'success', title: 'Status / Success' },
                { name: 'warning', title: 'Status / Warning' },
                { name: 'critical', title: 'Status / Critical' },
            ],
        ],
    },
    {
        title: 'Buttons',
        subtitle: 'Набор стилей для фона кнопок и прочих кликабельных поверхностей',
        type: 'swatch',
        groups: [
            [
                { name: 'buttonAccent', title: 'Primary / Brand' },
                { name: 'buttonAccentSber', title: 'Primary / Sber' },
                { name: 'buttonAccentAthena', title: 'Primary / Athena' },
                { name: 'buttonAccentJoy', title: 'Primary / Joy' },
            ],
            [{ name: 'buttonSecondary', title: 'Secondary / Default' }],
            [
                { name: 'buttonSuccess', title: 'Status / Success' },
                { name: 'buttonWarning', title: 'Status / Warning' },
                { name: 'buttonCritical', title: 'Status / Critical' },
                { name: 'buttonChecked', title: 'Status / Checked' },
            ],
        ],
    },
    {
        title: 'Background',
        subtitle: 'Набор стилей фона',
        type: 'card',
        groups: [
            [
                { name: 'background', title: 'Default' },
                {
                    name: 'overlay',
                    title: 'Overlay',
                    style: { '--plasma-tc-primary': 'white', '--plasma-tc-secondary': 'white' },
                },
                { name: NONE, title: '' },
                { name: 'backgroundPrimary', title: '01' },
                { name: 'backgroundSecondary', title: '02' },
                { name: 'backgroundTertiary', title: '03' },
                { name: 'gradientSber', title: 'Gradient / Sber' },
                { name: 'gradientAthena', title: 'Gradient / Athena' },
                { name: 'gradientJoy', title: 'Gradient / Joy' },
            ],
        ],
    },
    {
        title: 'Surface',
        subtitle: 'Набор стилей различных поверрхностей и подложек',
        type: 'card',
        groups: [
            [
                { name: 'surfaceLiquid01', title: 'Transparent / 01' },
                { name: 'surfaceLiquid02', title: 'Transparent / 02' },
                { name: 'surfaceLiquid03', title: 'Transparent / 03' },
                { name: 'surfaceCard', title: 'Card', style: styles.cardShadow },
            ],
        ],
    },
];

const StyledThemeBG = styled.div<{
    $primary: string;
    $secondary: string;
    $tertiary: string;
}>`
    box-sizing: border-box;
    width: 50%;
    max-width: 1280px;
    padding: 1rem;

    ${({ $primary, $secondary, $tertiary }) => css`
        --plasma-tc-primary: ${$primary};
        --plasma-tc-secondary: ${$secondary};
        --plasma-tc-tertiary: ${$tertiary};
    `}
`;
const StyledSection = styled.section``;
const StyledHeadline1 = styled(Headline1)`
    margin: 0 0 1rem;
    color: var(--plasma-tc-primary);
`;
const StyledHeadline3 = styled(Headline3)`
    margin: 0;
    color: var(--plasma-tc-primary);
`;
const StyledFootnote1 = styled(Footnote1)`
    margin: 0;
    color: var(--plasma-tc-secondary);
`;
const StyledGrid = styled.div`
    display: grid;
    grid-gap: 0.5rem;
    /* stylelint-disable-next-line number-max-precision */
    grid-template-columns: repeat(3, calc(33.3333% - 0.3333rem));

    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
`;
const StyledGroup = styled.div`
    display: grid;
    grid-gap: 0.5rem;
    align-items: start;
    grid-template-rows: repeat(auto-fill, 2.25rem);
`;
const StyledSwatch = styled.div<{ $isActive?: boolean }>`
    position: relative;
    display: grid;
    grid-template:
        'color name' 1fr
        'color descr' max-content / 3rem 1fr;

    padding-right: 0.25rem;
    border-radius: 2.25rem;
    cursor: pointer;

    &::before {
        content: '';
        position: absolute;
        top: -0.25rem;
        left: -0.25rem;
        right: -0.25rem;
        bottom: -0.25rem;
        z-index: 0;

        background: var(--plasma-tc-tertiary);
        border-radius: inherit;
        opacity: 0;
        transition: opacity 0.15s ease-in-out;
    }

    &:hover::before {
        opacity: 0.5;
    }
`;
const StyledCard = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 5.75rem;
    padding: 0.5rem 0.75rem;
    border-radius: 0.75rem;
    cursor: pointer;

    &::before {
        content: '';
        position: absolute;
        top: -0.25rem;
        left: -0.25rem;
        right: -0.25rem;
        bottom: -0.25rem;
        z-index: 0;

        box-shadow: inset 0 0 0 0.25rem var(--plasma-tc-tertiary);
        border-radius: 1rem;
        opacity: 0;
        transition: opacity 0.15s ease-in-out;
    }

    &:hover::before {
        opacity: 0.5;
    }
`;
const StyledColor = styled.div`
    position: relative;

    grid-area: color;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: inherit;
    box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.11), 1px 1px rgba(0, 0, 0, 0.11);
`;
const StyledTitle = styled(Footnote1)`
    position: relative;
    grid-area: name;
    color: var(--plasma-tc-primary);

    /* stylelint-disable-next-line selector-max-universal, selector-nested-pattern */
    *:hover > & {
        display: none;
    }

    ${applyEllipsis};
`;
const StyledName = styled(StyledTitle)`
    display: none;

    /* stylelint-disable-next-line selector-max-universal, selector-nested-pattern */
    *:hover > & {
        display: block;
    }
`;
const StyledDescr = styled(Caption)`
    position: relative;
    color: var(--plasma-tc-secondary);

    /* stylelint-disable-next-line selector-max-universal, selector-nested-pattern */
    *:hover > & {
        display: none;
    }

    ${applyEllipsis};
`;
const StyledVar = styled(StyledDescr)`
    display: none;

    /* stylelint-disable-next-line selector-max-universal, selector-nested-pattern */
    *:hover > & {
        display: block;
    }
`;

interface GroupProps {
    group: Group;
    colors: Record<string, string>;
}

const SwatchGroup: React.FC<GroupProps> = ({ group, colors }) => {
    return (
        <StyledGroup>
            {group.map((color) => {
                if (!colors[color.name] && color.name !== NONE) {
                    return null;
                }
                if (color.name === NONE) {
                    return <div />;
                }
                const cleanName = color.name.replace(/(Sber|Athena|Joy)$/, '');
                const paramName = paramCase(cleanName);
                return (
                    <StyledSwatch key={color.name}>
                        <StyledColor style={{ background: colors[color.name] }} />
                        <StyledName>{cleanName}</StyledName>
                        <StyledTitle>{color.title}</StyledTitle>
                        <StyledDescr>{comments[color.name]}</StyledDescr>
                        <StyledVar>var(--plasma-colors-{paramName})</StyledVar>
                    </StyledSwatch>
                );
            })}
        </StyledGroup>
    );
};
const CardGroup: React.FC<GroupProps> = ({ group, colors }) => {
    return (
        <>
            {group.map((color) => {
                if (!colors[color.name] && color.name !== NONE) {
                    return null;
                }
                if (color.name === NONE) {
                    return <div />;
                }
                const cleanName = color.name.replace(/(Sber|Athena|Joy)$/, '');
                const paramName = paramCase(cleanName);
                return (
                    <StyledCard key={color.name} style={{ ...color.style, background: colors[color.name] }}>
                        <StyledName>{cleanName}</StyledName>
                        <StyledTitle>{color.title}</StyledTitle>
                        <StyledDescr>{comments[color.name]}</StyledDescr>
                        <StyledVar>var(--plasma-colors-{paramName})</StyledVar>
                    </StyledCard>
                );
            })}
        </>
    );
};

export const ThemeColors: React.FC<{ colors: Record<Name, string> } & React.HTMLAttributes<HTMLDivElement>> = ({
    colors,
    title,
    ...rest
}) => {
    return (
        <StyledThemeBG {...rest} $primary={colors.primary} $secondary={colors.secondary} $tertiary={colors.tertiary}>
            <StyledHeadline1>{title}</StyledHeadline1>
            {sections.map((section, i) => (
                <StyledSection key={`section:${i}`}>
                    <StyledHeadline3 as="h3">{section.title}</StyledHeadline3>
                    <StyledFootnote1 as="h6">{section.subtitle}</StyledFootnote1>
                    <StyledGrid>
                        {section.groups.map((group, j) => {
                            if (section.type === 'swatch') {
                                return <SwatchGroup group={group} key={`group:${i}${j}`} colors={colors} />;
                            }
                            if (section.type === 'card') {
                                return <CardGroup group={group} key={`group:${i}${j}`} colors={colors} />;
                            }
                            return null;
                        })}
                    </StyledGrid>
                </StyledSection>
            ))}
        </StyledThemeBG>
    );
};
