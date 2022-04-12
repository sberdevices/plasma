import React, { FC, HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { black } from '@sberdevices/plasma-core';
import { IconMinus, IconPlus } from '@sberdevices/plasma-icons';
import type { DisabledProps } from '@sberdevices/plasma-core';

import { Button } from '../Button';
import { StepperRoot, StepperValue, useStepper } from '../Stepper';
import type { UseStepperProps } from '../Stepper';

export interface ProductCardStepperProps
    extends UseStepperProps,
        DisabledProps,
        Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {}

const StyledStepperRoot = styled(StepperRoot)`
    width: 100%;
`;
const StyledStepperValue = styled(StepperValue)<{ $isHidden?: boolean }>`
    color: ${black};

    ${({ $isHidden }) =>
        $isHidden &&
        css`
            display: none;
        `}
`;
const StyledStepperButton = styled(Button).attrs(() => ({ size: 's', square: true }))<{ $isHidden?: boolean }>`
    background-color: rgba(8, 8, 8, 0.12);
    color: ${black};
    align-self: flex-end;
    transition: ${({ theme }) => (theme.lowPerformance ? 'unset' : 'opacity 0.15s ease-in-out')};

    ${({ $isHidden }) =>
        $isHidden &&
        css`
            pointer-events: none;
            opacity: 0;
            visibility: hidden;
        `}
`;

/**
 * Степпер карточки продукта.
 */
export const ProductCardStepper: FC<ProductCardStepperProps> = ({
    value,
    step,
    min,
    max,
    disabled,
    onChange,
    ...rest
}) => {
    const { onLessClick, onMoreClick, isMax, isMoreDisabled } = useStepper({
        value,
        step,
        min,
        max,
        onChange,
    });
    const isValuePositive = value > 0;

    return (
        <StyledStepperRoot {...rest}>
            <StyledStepperButton disabled={disabled} $isHidden={!isValuePositive} onClick={onLessClick}>
                <IconMinus color="inherit" size="s" />
            </StyledStepperButton>
            <StyledStepperValue $isHidden={!isValuePositive} value={value} showWarning={isMax} />
            <StyledStepperButton disabled={disabled || isMoreDisabled} onClick={onMoreClick}>
                <IconPlus color="inherit" size="s" />
            </StyledStepperButton>
        </StyledStepperRoot>
    );
};
