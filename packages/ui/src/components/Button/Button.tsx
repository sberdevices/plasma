import React from 'react';
import styled from 'styled-components';
import { Button as BaseButton, ButtonProps as BaseButtonProps } from '@sberdevices/plasma-core/components/Button';
import type { AsProps } from '@sberdevices/plasma-core/types';

import { applyInteraction, InteractionProps } from '../../mixins';

/**
 * С текстом и/или контентом слева.
 */
interface TextAndLeftProps {
    /**
     * Текстовая надпись на кнопке
     */
    text: string | number;
    /**
     * Кастомный контент кнопки. При указании этого свойства contentLeft, contentRight и text не применяются
     */
    children?: never;
    /**
     * Слот для контента слева, например Icon
     */
    contentLeft?: React.ReactNode;
}

/**
 * С текстом и/или контентом справа.
 */
interface TextAndRightProps {
    text: string | number;
    children?: never;
    /**
     * Слот для контента справа, например Icon
     */
    contentRight?: React.ReactNode;
}

/**
 * С контентом слева.
 */
interface LeftProps {
    children?: never;
    contentLeft: React.ReactNode;
}

/**
 * Через ``children``.
 */
interface ChildrenProps {
    children: React.ReactNode;
}

/**
 * Интерфейс кнопки.
 */
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    AsProps &
    Partial<BaseButtonProps> &
    Pick<InteractionProps, 'scaleOnInteraction'> &
    (TextAndLeftProps | TextAndRightProps | LeftProps | ChildrenProps) & {
        size?: 'l' | 'm' | 's';
    };

interface StyledTextProps {
    isContentLeft?: boolean;
    isContentRight?: boolean;
}

const StyledText = styled.span<StyledTextProps>`
    box-sizing: border-box;

    ${({ isContentLeft }) => isContentLeft && 'margin-left: 0.375rem;'}
    ${({ isContentRight }) => isContentRight && 'margin-right: 0.375rem;'}
`;

/**
 * Для внутреннего использования.
 */
interface AllContentProps
    extends TextAndLeftProps,
        Pick<TextAndRightProps, 'contentRight'>,
        Pick<TextAndRightProps, 'children'> {}

export const StyledBaseButton = styled(BaseButton)`
    ${applyInteraction}
`;

/**
 * Основной компонент для создания кнопок.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    // eslint-disable-next-line prefer-arrow-callback
    function Button(
        {
            view = 'secondary',
            size = 'l',
            pin = 'square-square',
            outlined = true,
            resizible = false,
            scaleOnInteraction = true,
            square,
            ...props
        },
        ref,
    ) {
        const { text, contentLeft, contentRight, children, ...rest } = props as AllContentProps;

        return (
            <StyledBaseButton
                view={view}
                size={size}
                pin={pin}
                outlined={outlined}
                square={square !== undefined ? square : !text && !children}
                resizible={resizible}
                scaleOnInteraction={scaleOnInteraction}
                ref={ref}
                {...rest}
            >
                {children}
                {!children && contentLeft}
                {!children && text && (
                    <StyledText isContentLeft={!!contentLeft} isContentRight={!!contentRight}>
                        {text}
                    </StyledText>
                )}
                {!children && contentRight}
            </StyledBaseButton>
        );
    },
);
