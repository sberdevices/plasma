import React, { forwardRef } from 'react';

import { ButtonRoot, ButtonText } from './Button';
import type { ButtonProps, ButtonAllContentProps } from './Button.types';

/**
 * Функция для создания компонента Button,
 * что дает возможность кастомизировать вид, пропсы и т.п.,
 * при этом сохраняя в базе общий интерфейс.
 */
export function createButton<T, P extends ButtonProps>(Root = ButtonRoot) {
    // eslint-disable-next-line prefer-arrow-callback
    return forwardRef<T, P>(function Button(
        { children, text, contentLeft, contentRight, square, ...rest }: ButtonProps & ButtonAllContentProps,
        ref,
    ) {
        const isContentLeft = Boolean(contentLeft);
        const isContentRight = Boolean(contentRight);

        return (
            <Root
                ref={ref}
                $isContentLeft={isContentLeft}
                $isContentRight={isContentRight}
                square={square !== undefined ? square : !text && !children}
                {...rest}
            >
                {children}
                {!children && contentLeft}
                {!children && text && (
                    <ButtonText $isContentLeft={isContentLeft} $isContentRight={isContentRight}>
                        {text}
                    </ButtonText>
                )}
                {!children && contentRight}
            </Root>
        );
    });
}
