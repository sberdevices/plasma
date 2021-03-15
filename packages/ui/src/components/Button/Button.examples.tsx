import React from 'react';
import styled, { css } from 'styled-components';
import isChromatic from 'chromatic/isChromatic';
import { select } from '@storybook/addon-knobs';
import {
    buttonAccent,
    buttonSecondary,
    buttonWarning,
    buttonCritical,
    buttonChecked,
} from '@sberdevices/plasma-tokens';
import { IconMic } from '@sberdevices/plasma-icons';

import { ShowcaseDashedBorder } from '../../helpers';
import { Body1 } from '../Typography';

import { Button, ButtonProps, ActionButton } from '.';

const StyledGrid = styled.div<{ isMobile: boolean }>`
    --horizontal-spacing: var(--plasma-docs-buttons-horizontal-spacing, 2rem);
    --vertical-spacing: var(--plasma-docs-buttons-vertical-spacing, 2rem);
    --cell-spacing: var(--plasma-docs-buttons-cell-spacing, 1rem);
    --border-spacing: var(--plasma-docs-buttons-border-spacing, 1.25rem);

    display: grid;
    grid-template-columns: ${({ isMobile }) => css`
        max-content repeat(${!isMobile ? 3 : 2}, 13.75rem) repeat(${!isMobile ? 3 : 2}, max-content)
    `};
    grid-column-gap: var(--horizontal-spacing);
    grid-row-gap: var(--vertical-spacing);
`;
const StyledRow = styled.div`
    display: contents;
`;
const StyledMarker = styled(Body1)<{ bg?: string; isFirstRow: boolean; isLastRow: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    text-align: right;
    margin-right: 1.75rem;
    padding-right: 1.625rem;

    ${({ isFirstRow, isLastRow }) => css`
        ${isFirstRow &&
        css`
            &:first-child {
                margin-top: var(--border-spacing);
            }
        `}
        ${isLastRow &&
        css`
            &:last-child {
                margin-bottom: var(--border-spacing);
            }
        `}
    `}

    &::after {
        position: absolute;
        top: 0;
        right: 0;
        content: '';
        width: 0.125rem;
        height: 100%;
        background: ${({ bg }) => bg};
    }
`;
const StyledCell = styled.div<{ isFirstRow: boolean; isLastRow: boolean }>`
    --horizontal-stretch: calc(var(--horizontal-spacing) / 2);
    --vertical-stretch: calc(var(--vertical-spacing) / 2);

    display: grid;
    grid-row-gap: var(--cell-spacing);
    margin: calc(var(--vertical-stretch) * -1) calc(var(--horizontal-stretch) * -1);
    padding: var(--vertical-stretch) var(--horizontal-stretch);
    border: 0 dashed #7765f6;

    ${({ isFirstRow, isLastRow }) => css`
        ${isFirstRow &&
        css`
            margin-top: 0;
            padding-top: var(--border-spacing);
            border-top-width: 0.0625rem;

            &:nth-child(2) {
                border-top-left-radius: 1.25rem;
            }

            &:last-child {
                border-top-right-radius: 1.25rem;
            }
        `}
        ${isLastRow &&
        css`
            margin-bottom: 0;
            padding-bottom: var(--border-spacing);
            border-bottom-width: 0.0625rem;

            &:nth-child(2) {
                border-bottom-left-radius: 1.25rem;
            }

            &:last-child {
                border-bottom-right-radius: 1.25rem;
            }
        `}
    `}

    &:nth-child(2) {
        padding-left: var(--border-spacing);
        border-left-width: 0.0625rem;
    }

    &:last-child {
        padding-right: var(--border-spacing);
        border-right-width: 0.0625rem;
    }
`;
const StyledHead = styled(Body1)`
    &:nth-child(2) {
        padding-left: var(--horizontal-spacing);
    }
`;
const StyledCubicGrid = styled.div<{ isMobile: boolean }>`
    display: grid;
    grid-column-gap: var(--plasma-docs-buttons-horizontal-spacing, 2rem);
    grid-row-gap: var(--plasma-docs-buttons-cell-spacing, 1rem);
    grid-template-columns: ${({ isMobile }) => css`
        repeat(${!isMobile ? 3 : 2}, max-content)
    `};
`;
const StyledDashedBorder = styled(ShowcaseDashedBorder)`
    padding: 2.5rem;
`;

const contentLeft = <IconMic color="inherit" size="s" />;

export const sizes = ['l', 'm', 's'];
export const views = ['primary', 'secondary', 'warning', 'critical', 'checked', 'overlay', 'clear'];
export const pins = [
    'square-square',
    'square-clear',
    'clear-square',
    'clear-clear',
    'clear-circle',
    'circle-clear',
    'circle-circle',
];

const headers = ['Normal', 'Focused', 'Disabled', 'Normal', 'Focused', 'Disabled'];
const colors = [buttonAccent, buttonSecondary, buttonWarning, buttonCritical, buttonChecked];
const items = [
    { outlined: true, focused: false, disabled: false, resizible: true, contentLeft: null },
    { outlined: true, focused: true, disabled: false, resizible: true, contentLeft: null },
    { outlined: true, focused: false, disabled: true, resizible: true, contentLeft: null },
    { outlined: true, focused: false, disabled: false, resizible: false, contentLeft: null },
    { outlined: true, focused: true, disabled: false, resizible: false, contentLeft: null },
    { outlined: true, focused: false, disabled: true, resizible: false, contentLeft: null },
];
const regular = items.map((item) => [item, { ...item, contentLeft }]);
const cubics = items.slice(0, 3).map((item) => ({ ...item, contentLeft }));

const filterViews = (v: typeof views, isMobile: boolean) => v.filter((view) => !isMobile || view !== 'clear');
const filterHeaders = (h: typeof headers, isMobile: boolean) => h.filter((header) => !isMobile || header !== 'Focused');
const filterItems = (i: any[], isMobile: boolean) =>
    i.filter((entry) => !isMobile || (Array.isArray(entry) ? !entry[0].focused : !entry.focused));

const capit = (str: string) => str[0].toUpperCase() + str.slice(1);

interface ShowcaseProps {
    size: string;
    isMobile: boolean;
}
interface ShowcaseHelperProps extends ShowcaseProps, React.HTMLAttributes<HTMLDivElement> {
    render: (props: ButtonProps & any, key: string) => object;
}
interface ShowcaseStoryProps extends Partial<ShowcaseProps>, React.HTMLAttributes<HTMLDivElement> {
    component?: any;
}

/**
 * Шоукейсы - обертки для демонстрации / тестирования полной раскладки презентуемого компонента.
 */
const Showcase = ({ render, size = 'l', isMobile = false, ...rest }: ShowcaseHelperProps) => (
    <StyledGrid {...rest} isMobile={isMobile}>
        <Body1>&nbsp;</Body1>
        {filterHeaders(headers, isMobile).map((header, i) => (
            <StyledHead key={`header${i}`}>{header}</StyledHead>
        ))}
        {filterViews(views, isMobile).map((view, i) => {
            const isFirst = i === 0;
            const isLast = i === views.length - 1;

            return (
                <React.Fragment key={`${view}`}>
                    <StyledRow>
                        <StyledMarker bg={colors[i]} isFirstRow={isFirst} isLastRow={isLast}>
                            {capit(view)}
                        </StyledMarker>
                        {(filterItems(regular, isMobile) as typeof regular).map((pair, j) => (
                            <StyledCell key={`${view}${j}`} isFirstRow={isFirst} isLastRow={isLast}>
                                {pair.map((item, k) =>
                                    render(
                                        {
                                            ...item,
                                            view,
                                            size: size || select('size', sizes, 'l'),
                                        },
                                        `${view}${j}${k}`,
                                    ),
                                )}
                            </StyledCell>
                        ))}
                    </StyledRow>
                </React.Fragment>
            );
        })}
    </StyledGrid>
);
const CubicShowcase = ({ render, size = 'l', isMobile = false, ...rest }: ShowcaseHelperProps) => (
    <StyledDashedBorder {...rest}>
        <StyledCubicGrid isMobile={isMobile}>
            {filterViews(views, isMobile).map((view) =>
                filterItems(cubics, isMobile).map((item, i) =>
                    render(
                        {
                            ...item,
                            view,
                            size,
                        },
                        `${view}${i}`,
                    ),
                ),
            )}
        </StyledCubicGrid>
    </StyledDashedBorder>
);

const components = {
    Default: Button,
    ActionButton,
};

/**
 * Применяя этот декоратор,
 * в chromatic будет запускаться тестирование по showcase,
 * а в storybook будет интерактивный компонент (knobs).
 * Чтобы протестировать оба компонента (Button, ActionButton),
 * воспользуемся информацией из контекста и подставим нужный инстанс.
 */
export const ButtonDecorator = (Story: React.FC, { story = 'Default' }: { story: 'Default' | 'ActionButton' }) => {
    const component = components[story] || Button;

    if (isChromatic()) {
        return (
            <>
                <Default component={component} style={{ marginBottom: '1.25rem' }} />
                <Squared component={component} style={{ display: 'inline-flex', marginRight: '1.25rem' }} />
                <Circled component={component} style={{ display: 'inline-flex' }} />
            </>
        );
    }
    return <Story />;
};

export const Default = ({ component = Button, size = 'l', isMobile = false, ...rest }: ShowcaseStoryProps) => {
    const Component = component;

    return (
        <Showcase
            {...rest}
            size={size}
            isMobile={isMobile}
            render={(props, key) => (
                <Component
                    key={key}
                    size={props.size}
                    view={props.view}
                    outlined={props.outlined}
                    focused={props.focused}
                    disabled={props.disabled}
                    resizible={props.resizible}
                >
                    {props.contentLeft}
                    Label
                </Component>
            )}
        />
    );
};

export const Squared = ({ component = Button, size = 'l', isMobile = false, ...rest }: ShowcaseStoryProps) => {
    const Component = component;

    return (
        <CubicShowcase
            {...rest}
            size={size}
            isMobile={isMobile}
            render={(props, key) => (
                <Component
                    key={key}
                    pin="square-square"
                    square
                    size={props.size}
                    view={props.view}
                    outlined={props.outlined}
                    focused={props.focused}
                    disabled={props.disabled}
                    resizible={props.resizible}
                >
                    {props.contentLeft}
                </Component>
            )}
        />
    );
};

export const Circled = ({ component = Button, size = 'l', isMobile = false, ...rest }: ShowcaseStoryProps) => {
    const Component = component;

    return (
        <CubicShowcase
            {...rest}
            size={size}
            isMobile={isMobile}
            render={(props, key) => (
                <Component
                    key={key}
                    pin="circle-circle"
                    square
                    size={props.size}
                    view={props.view}
                    outlined={props.outlined}
                    focused={props.focused}
                    disabled={props.disabled}
                    resizible={props.resizible}
                >
                    {props.contentLeft}
                </Component>
            )}
        />
    );
};
