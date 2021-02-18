import React from 'react';
import { ButtonProps as BaseButtonProps } from '@sberdevices/plasma-core/components/Button';

import { InteractionProps } from '../../mixins';

import { StyledBaseButton } from './Button';

/**
 * Интерфейс кнопки.
 */
export interface ActionButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        Partial<BaseButtonProps>,
        Pick<InteractionProps, 'scaleOnInteraction'> {
    size?: 'l' | 'm' | 's';
}

const downsize: Record<string, BaseButtonProps['size']> = {
    l: 'xs',
    m: 'xxs',
    s: 'xxxs',
};

export const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
    // eslint-disable-next-line prefer-arrow-callback
    function ActionButton(
        {
            view = 'secondary',
            size = 'm',
            pin = 'circle-circle',
            outlined = true,
            resizible = false,
            square = true,
            scaleOnInteraction = true,
            children,
            ...rest
        },
        ref,
    ) {
        return (
            <StyledBaseButton
                view={view}
                size={downsize[size]}
                pin={pin}
                outlined={outlined}
                square={square}
                resizible={resizible}
                scaleOnInteraction={scaleOnInteraction}
                ref={ref}
                {...rest}
            >
                {children}
            </StyledBaseButton>
        );
    },
);
