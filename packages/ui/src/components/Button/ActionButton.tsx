import React from 'react';
import styled from 'styled-components';
import { Button as BaseButton, getSizesMixin, getRadiusesMixin } from '@sberdevices/plasma-core/components/Button';
import type { ButtonProps as BaseButtonProps, AsElement } from '@sberdevices/plasma-core/components/Button';
import type {} from '@sberdevices/plasma-core/components/Button/Button';
import { applyBlur } from '@sberdevices/plasma-core/mixins';
import type { BlurProps } from '@sberdevices/plasma-core/mixins';
import { button2, caption } from '@sberdevices/plasma-tokens';

import { applyInteraction, InteractionProps } from '../../mixins';

const applySizes = getSizesMixin(
    {
        l: {
            height: '2.25rem',
            paddingY: '0.5rem',
            paddingX: '0.625rem',
            paddingXResizible: '1.25',
        },
        m: {
            height: '2rem',
            paddingY: '0.4375rem',
            paddingX: '0.5rem',
            paddingXResizible: '0.875rem',
        },
        s: {
            height: '1.75rem',
            paddingY: '0.3125rem',
            paddingX: '0.375rem',
            paddingXResizible: '0.875rem',
        },
    },
    {
        l: button2,
        m: caption,
        s: caption,
    },
);
const applyRadiuses = getRadiusesMixin({
    l: {
        squareRadius: '0.625rem',
        sOutlineRadius: '0.75rem',
        circleRadius: '1.125rem',
        cOutlineRadius: '1.25rem',
    },
    m: {
        squareRadius: '0.5625rem',
        sOutlineRadius: '0.6875rem',
        circleRadius: '1rem',
        cOutlineRadius: '1.125rem',
    },
    s: {
        squareRadius: '0.5rem',
        sOutlineRadius: '0.625rem',
        circleRadius: '0.875rem',
        cOutlineRadius: '1rem',
    },
});

const StyledButton = styled(BaseButton)<InteractionProps & BlurProps>`
    ${applySizes}
    ${applyRadiuses}
    ${applyInteraction}
    ${applyBlur}
`;

/**
 * Интерфейс кнопки.
 */
export type ActionButtonProps = BaseButtonProps & InteractionProps & BlurProps;

/**
 * Кнопка для размещения внутри карточек.
 * Упрощенная версия ``Button`` для создания квадратных кнопок (с соотношением сторон 1:1).
 * Размеры ``ActionButton`` меньше размеров ``Button``.
 * Обладает теми же цветами, размерами и модификаторами, что и основная кнопка.
 */
export const ActionButton = React.forwardRef<AsElement, ActionButtonProps>(
    // eslint-disable-next-line prefer-arrow-callback
    function Button(
        {
            as = 'button',
            view = 'secondary',
            size = 'm',
            pin = 'square-square',
            outlined = true,
            scaleOnInteraction = true,
            children,
            ...rest
        },
        ref,
    ) {
        if (as === 'a') {
            rest.type = undefined;
            rest.name = undefined;
        } else if (as === 'button') {
            rest.href = undefined;
            rest.rel = undefined;
        }

        return (
            <StyledButton<typeof as>
                as={as}
                ref={ref}
                view={view}
                size={size}
                pin={pin}
                outlined={outlined}
                scaleOnInteraction={scaleOnInteraction}
                {...rest}
            >
                {children}
            </StyledButton>
        );
    },
);
