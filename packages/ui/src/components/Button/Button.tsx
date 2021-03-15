import React from 'react';
import styled from 'styled-components';
import { Button as BaseButton, ButtonText } from '@sberdevices/plasma-core/components/Button';
import type {
    ButtonProps as BaseButtonProps,
    ButtonContentProps,
    AsElement,
} from '@sberdevices/plasma-core/components/Button';
import type {} from '@sberdevices/plasma-core/components/Button/Button';
import { applyBlur } from '@sberdevices/plasma-core/mixins';
import type { BlurProps } from '@sberdevices/plasma-core/mixins';

import { applyInteraction, InteractionProps } from '../../mixins';

const StyledButton = styled(BaseButton)<InteractionProps & BlurProps>`
    ${applyInteraction}
    ${applyBlur}
`;

/**
 * Интерфейс кнопки.
 */
export type ButtonProps = BaseButtonProps & ButtonContentProps & InteractionProps & BlurProps;

/**
 * Основной компонент для создания кнопок.
 */
export const Button = React.forwardRef<AsElement, ButtonProps>(
    // eslint-disable-next-line prefer-arrow-callback
    function Button(
        {
            as = 'button',
            view = 'secondary',
            size = 'l',
            pin = 'square-square',
            outlined = true,
            scaleOnInteraction = true,
            square,
            ...props
        },
        ref,
    ) {
        if (as === 'a') {
            props.type = undefined;
            props.name = undefined;
        } else if (as === 'button') {
            props.href = undefined;
            props.rel = undefined;
        }

        const { text, contentLeft, contentRight, children, ...rest } = props;

        return (
            <StyledButton<typeof as>
                as={as}
                ref={ref}
                view={view}
                size={size}
                pin={pin}
                outlined={outlined}
                scaleOnInteraction={scaleOnInteraction}
                square={square !== undefined ? square : !text && !children}
                {...rest}
            >
                {children}
                {!children && contentLeft}
                {!children && text && (
                    <ButtonText isContentLeft={!!contentLeft} isContentRight={!!contentRight}>
                        {text}
                    </ButtonText>
                )}
                {!children && !contentLeft && contentRight}
            </StyledButton>
        );
    },
);
