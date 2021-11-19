import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { caption, buttonChecked, inverse, shadows } from '@sberdevices/plasma-core';
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

const StyledRoot = styled.div`
    position: relative;
    display: inline-flex;
`;

const StyledWrapper = styled.div`
    display: inherit;
`;

const StyledArrow = styled.div`
    visibility: hidden;

    &,
    &::before {
        position: absolute;
        width: 0.5rem;
        height: 0.5rem;
        background: inherit;
    }

    &::before {
        visibility: visible;
        content: '';
        transform: rotate(45deg);
    }
`;

const StyledTooltip = styled.span<Pick<TooltipProps, 'isVisible' | 'animated'>>`
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

    &[data-popper-placement^='top'] > ${StyledArrow} {
        bottom: -0.25rem;
    }

    &[data-popper-placement^='bottom'] > ${StyledArrow} {
        top: -0.25rem;
    }

    &[data-popper-placement^='left'] > ${StyledArrow} {
        right: -0.25rem;
    }

    &[data-popper-placement^='right'] > ${StyledArrow} {
        left: -0.25rem;
    }

    ${({ isVisible, animated }) =>
        animated &&
        css`
            opacity: ${Number(isVisible)};
        `}
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
    const [wrapperElement, setWrapperElement] = useState<HTMLDivElement | null>(null);
    const [tooltipElement, setTooltipElement] = useState<HTMLSpanElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLSpanElement | null>(null);
    const { styles, attributes } = usePopper(wrapperElement, tooltipElement, {
        placement,
        modifiers: [
            { name: 'offset', options: { offset: [offset[0], offset[1]] } },
            { name: 'arrow', options: { element: arrowElement, padding: 10 } },
        ],
    });

    return (
        <StyledRoot aria-describedby={id} {...rest}>
            <StyledTooltip
                ref={setTooltipElement}
                id={id}
                isVisible={isVisible}
                animated={animated}
                style={styles.popper}
                role="tooltip"
                aria-hidden="true"
                {...attributes.popper}
            >
                {arrow && <StyledArrow ref={setArrowElement} style={styles.arrow} {...attributes.arrow} />}
                {text}
            </StyledTooltip>
            {children && <StyledWrapper ref={setWrapperElement}>{children}</StyledWrapper>}
        </StyledRoot>
    );
};
