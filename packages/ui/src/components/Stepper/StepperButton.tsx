import React from 'react';

import { PickOptional } from '../../types/PickOptional';
import { ActionButton, ButtonProps } from '../Button';

export interface StepperButtonProps
    extends PickOptional<
        ButtonProps,
        'pin' | 'view' | 'disabled' | 'className' | 'style' | 'onFocus' | 'onBlur' | 'onClick'
    > {
    icon?: React.ReactElement;
}

/**
 * Стилизованная кнопка, применяемая для контроля над значением степпера.
 */
export const StepperButton: React.FC<StepperButtonProps> = ({
    pin = 'circle-circle',
    view = 'secondary',
    icon,
    ...rest
}) => (
    <ActionButton size="m" pin={pin} view={view} {...rest}>
        {icon}
    </ActionButton>
);
