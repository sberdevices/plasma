import React from 'react';
import styled, { css } from 'styled-components';
import { caption, buttonChecked, inverse } from '@sberdevices/plasma-tokens-web';
import { shadows } from '@sberdevices/plasma-core/mixins';
import { usePopper } from 'react-popper';

/** Направление раскрытия тултипа */
export type BasePlacement = 'top' | 'bottom' | 'right' | 'left';
export type VariationPlacement = 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
export type Placement = BasePlacement | VariationPlacement;

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Текст тултипа.
     */
    text: string;
    /**
     * Видимость тултипа.
     */
    isVisible: boolean;
    /**
     * Направление раскрытия тултипа.
     */
    placement?: Placement;
    /**
     * Видимость стрелки (хвоста).
     */
    arrow?: boolean;
    /**
     * Анимированное появление/сокрытие.
     */
    animated?: boolean;
}

const offset = [0, 6];
const tooltipPlacements = {
    top: css`
        left: 50%;
        bottom: 100%;
        transform: translate(-50%, -0.375rem);
    `,
    'top-start': css`
        left: 0;
        bottom: 100%;
        transform: translate(0, -0.375rem);
    `,
    'top-end': css`
        right: 0;
        bottom: 100%;
        transform: translate(0, -0.375rem);
    `,
    bottom: css`
        top: 100%;
        left: 50%;
        transform: translate(-50%, 0.375rem);
    `,
    'bottom-start': css`
        top: 100%;
        left: 0;
        transform: translate(0, 0.375rem);
    `,
    'bottom-end': css`
        top: 100%;
        right: 0;
        transform: translate(0, 0.375rem);
    `,
    left: css`
        right: 100%;
        bottom: 50%;
        transform: translate(-0.375rem, 50%);
    `,
    right: css`
        left: 100%;
        bottom: 50%;
        transform: translate(0.375rem, 50%);
    `,
};
const arrowPlacements = {
    top: css`
        top: 100%;
        left: 50%;
        border-left-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
        transform: translate(-50%, 0);
    `,
    'top-start': css`
        top: 100%;
        left: 0.375rem;
        border-left-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
    `,
    'top-end': css`
        top: 100%;
        right: 0.375rem;
        border-left-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
    `,
    bottom: css`
        left: 50%;
        bottom: 100%;
        border-top-color: transparent;
        border-left-color: transparent;
        border-right-color: transparent;
        transform: translate(-50%, 0);
    `,
    'bottom-start': css`
        left: 0.375rem;
        bottom: 100%;
        border-top-color: transparent;
        border-left-color: transparent;
        border-right-color: transparent;
    `,
    'bottom-end': css`
        right: 0.375rem;
        bottom: 100%;
        border-top-color: transparent;
        border-left-color: transparent;
        border-right-color: transparent;
    `,
    left: css`
        left: 100%;
        bottom: 50%;
        border-top-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
        transform: translate(0, 50%);
    `,
    right: css`
        right: 100%;
        bottom: 50%;
        border-top-color: transparent;
        border-left-color: transparent;
        border-bottom-color: transparent;
        transform: translate(0, 50%);
    `,
};

const StyledRoot = styled.div`
    position: relative;
    display: inline-flex;
`;
const StyledWrapper = styled.div`
    display: inherit;
`;
const StyledTooltip = styled.span<Pick<TooltipProps, 'isVisible' | 'animated' | 'placement'>>`
    ${caption}

    position: absolute;
    z-index: 9200;

    padding: 0.375rem 0.5rem;

    background-color: ${buttonChecked};
    border-radius: 0.25rem;
    box-shadow: ${shadows.small};
    color: ${inverse};

    white-space: pre;

    transition: opacity 200ms ease-in-out;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    ${({ placement }) => placement && tooltipPlacements[placement]}

    ${({ isVisible, animated }) =>
        animated &&
        css`
            opacity: ${Number(isVisible)};
        `}
`;
const StyledArrow = styled.span<Pick<TooltipProps, 'placement'>>`
    position: absolute;

    display: block;

    width: 0;
    height: 0;

    border-style: solid;
    border-width: 0.375rem;
    border-color: ${buttonChecked};

    ${({ placement }) => placement && arrowPlacements[placement]}

    /* stylelint-disable no-descending-specificity, selector-nested-pattern,
    declaration-block-semicolon-newline-after, rule-empty-line-before */
    ${StyledTooltip}[data-popper-placement='top'] &,
    ${StyledTooltip}[data-popper-placement='top-start'] &,
    ${StyledTooltip}[data-popper-placement='top-end'] & {
        ${arrowPlacements.top}
    }

    ${StyledTooltip}[data-popper-placement='bottom'] &,
    ${StyledTooltip}[data-popper-placement='bottom-start'] &,
    ${StyledTooltip}[data-popper-placement='bottom-end'] & {
        ${arrowPlacements.bottom}
    }

    ${StyledTooltip}[data-popper-placement='left'] & {
        ${arrowPlacements.left}
    }

    ${StyledTooltip}[data-popper-placement='right'] & {
        ${arrowPlacements.right}
    }
    /* stylelint-enable no-descending-specificity, selector-nested-pattern,
    declaration-block-semicolon-newline-after, rule-empty-line-before */
`;

/**
 * Компонент для текстовых подсказок. Основное предназначение — подписи к блокам.
 */
export const Tooltip: React.FC<TooltipProps> = ({
    id,
    text,
    isVisible,
    arrow = true,
    animated = true,
    placement = 'bottom',
    children,
    ...rest
}) => {
    const tooltipRef = React.useRef<HTMLSpanElement | null>(null);
    const arrowRef = React.useRef<HTMLSpanElement | null>(null);
    const wrapperRef = React.useRef<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(wrapperRef.current, tooltipRef.current, {
        placement,
        modifiers: [
            { name: 'offset', options: { offset: [offset[0], offset[1]] } },
            { name: 'arrow', options: { element: arrowRef.current } },
        ],
    });

    return (
        <StyledRoot aria-describedby={id} {...rest}>
            <StyledTooltip
                ref={tooltipRef}
                id={id}
                isVisible={isVisible}
                animated={animated}
                placement={placement}
                style={tooltipRef.current ? styles.popper : undefined}
                role="tooltip"
                aria-hidden="true"
                {...attributes.popper}
            >
                {arrow && (
                    <StyledArrow
                        ref={arrowRef}
                        placement={placement}
                        style={arrowRef.current ? styles.arrow : undefined}
                        {...attributes.arrow}
                    />
                )}
                {text}
            </StyledTooltip>
            {children && <StyledWrapper ref={wrapperRef}>{children}</StyledWrapper>}
        </StyledRoot>
    );
};
