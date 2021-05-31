import React from 'react';
import type { PickOptional } from '@sberdevices/plasma-core';

import { ActionButton, ButtonProps, ActionButtonProps } from '../Button';

export type Pin = ActionButtonProps['pin'];
export interface StepperButtonProps
    extends PickOptional<ButtonProps, 'view' | 'disabled' | 'className' | 'style' | 'onFocus' | 'onBlur' | 'onClick'> {
    icon?: React.ReactElement;
    pin?: Pin;
}

/**
 * Стилизованная кнопка, применяемая для контроля над значением степпера.
 */
export const StepperButton = React.forwardRef<HTMLButtonElement, StepperButtonProps>(
    // eslint-disable-next-line prefer-arrow-callback
    function StepperButton({ pin = 'circle-circle', view = 'secondary', icon, ...rest }, ref) {
        return (
            <ActionButton size="m" ref={ref} pin={pin} view={view} {...rest}>
                {icon}
            </ActionButton>
        );
    },
);
