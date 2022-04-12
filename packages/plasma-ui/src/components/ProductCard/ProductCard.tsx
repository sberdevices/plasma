import React, { forwardRef, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { body1, black, blackSecondary, success, mediaQuery } from '@sberdevices/plasma-core';
import type { DisabledProps } from '@sberdevices/plasma-core';
import Color from 'color';

import { Price } from '../Price';
import { Footnote1, Body2, Caption } from '../Typography';
import { Card } from '../Card/Card';
import type { CardProps } from '../Card/Card';
import { CardBody } from '../Card/CardBody';
import { CardContent } from '../Card/CardContent';

import { ProductCardStepper } from './ProductCardStepper';
import type { ProductCardStepperProps } from './ProductCardStepper';

export interface ProductCardProps extends CardProps, DisabledProps {
    /**
     * Слот под картинку.
     */
    media?: ReactNode;
    /**
     * Слот под бейдж (-и).
     */
    badge?: ReactNode;
    /**
     * Текст или название карточки.
     */
    text?: string;
    /**
     * Актуальная цена.
     */
    price?: number;
    /**
     * Старая (перечеркнутая) цена.
     */
    oldPrice?: number;
    /**
     * Количество.
     */
    quantity?: ProductCardStepperProps['value'];
    /**
     * Колбек изменени количества.
     */
    onQuantityChange?: ProductCardStepperProps['onChange'];
    /**
     * Шаг изменения количества.
     */
    quantityStep?: ProductCardStepperProps['step'];
    /**
     * Минимальное количества.
     */
    quantityMin?: ProductCardStepperProps['min'];
    /**
     * Максимальное количества.
     */
    quantityMax?: ProductCardStepperProps['max'];
    /**
     * Слот под степпер.
     */
    stepper?: ReactNode;
    /**
     * Цвет подложки и градиента карточки.
     */
    backgroundColor?: string;
}

const StyledCard = styled(Card)<{ $backgroundColor?: string }>`
    background-color: ${({ $backgroundColor }) => $backgroundColor};
    color: ${blackSecondary};
`;
const StyledMediaSlot = styled.div`
    & img {
        display: block;
    }
`;

const getGradient = (backgroundColor: string) => {
    const color = Color(backgroundColor);

    return `linear-gradient(
        180deg,
        ${color.alpha(0).string()} 0%,
        ${color.alpha(0.0156863).string()} 8.62%,
        ${color.alpha(0.054902).string()} 16.56%,
        ${color.alpha(0.117647).string()} 23.93%,
        ${color.alpha(0.2).string()} 30.85%,
        ${color.alpha(0.290196).string()} 37.42%,
        ${color.alpha(0.392157).string()} 43.77%,
        ${color.alpha(0.501961).string()} 50%,
        ${color.alpha(0.607843).string()} 56.23%,
        ${color.alpha(0.709804).string()} 62.58%,
        ${color.alpha(0.8).string()} 69.15%,
        ${color.alpha(0.882353).string()} 76.07%,
        ${color.alpha(0.945098).string()} 83.44%,
        ${color.alpha(0.984314).string()} 91.38%,
        ${backgroundColor} 100%
    )`;
};

const StyledCardContent = styled(CardContent)<{ $backgroundColor?: string; $cover?: boolean }>`
    padding: 0.75rem;
    border-radius: 0;
    background-color: ${({ $backgroundColor }) => $backgroundColor};
    transition: ${({ theme }) => (theme.lowPerformance ? 'unset' : 'all 0.15s ease-in-out')};

    &::after {
        content: '';
        position: absolute;
        top: -2.5rem;
        left: 0;
        right: 0;
        height: 2.5rem;
        opacity: 0;
        transition: ${({ theme }) => (theme.lowPerformance ? 'unset' : 'all 0.15s ease-in-out')};
        background: ${({ $backgroundColor }) => $backgroundColor && getGradient($backgroundColor)};
    }

    ${({ $cover }) =>
        $cover &&
        css`
            margin-top: -1.875rem;

            &::after {
                opacity: 1;
            }
        `}
`;
const StyledBadgeSlot = styled.div`
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
`;
const StyledText = styled(Footnote1)`
    ${(props) =>
        mediaQuery(
            'XL',
            props.theme.deviceScale,
        )(
            css`
                ${body1}
            `,
        )}
`;
const StyledBottom = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 0.25rem;
`;
const StyledPrices = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-height: 2.375rem;
`;
const StyledPrice = styled(Price)<{ $type?: 'new' | 'old' }>`
    color: ${({ $type }) => {
        switch ($type) {
            case 'new':
                return success;
            case 'old':
                return blackSecondary;
            default:
                return black;
        }
    }};
`;
const StyledStepper = styled(ProductCardStepper)<{ $onTop?: boolean }>`
    width: 100%;
    transition: ${({ theme }) => (theme.lowPerformance ? 'unset' : 'all 0.15s ease-in-out')};

    ${({ $onTop }) =>
        $onTop
            ? css`
                  margin-top: -2.5rem;
              `
            : css`
                  margin-top: 0.5rem;
              `}
`;

/**
 * Карточка продукта с возможностью указания картинки, текста, цены и выбора количества.
 */
// eslint-disable-next-line prefer-arrow-callback
export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(function ProductCard(
    {
        badge,
        media,
        text,
        price,
        oldPrice,
        quantity,
        quantityStep,
        quantityMin,
        quantityMax,
        onQuantityChange,
        disabled,
        backgroundColor = '#FFFFFF',
        ...rest
    },
    ref,
) {
    return (
        <StyledCard {...rest} ref={ref} disabled={disabled} $backgroundColor={backgroundColor}>
            <CardBody>
                {media && <StyledMediaSlot>{media}</StyledMediaSlot>}
                {badge && <StyledBadgeSlot>{badge}</StyledBadgeSlot>}
                <StyledCardContent
                    $backgroundColor={backgroundColor}
                    $cover={media !== undefined && quantity !== undefined && quantity > 0}
                >
                    {text && <StyledText>{text}</StyledText>}
                    {(price !== undefined || quantity !== undefined) && (
                        <StyledBottom>
                            {price !== undefined && (
                                <StyledPrices>
                                    <StyledPrice $type={oldPrice !== undefined ? 'new' : undefined} forwardedAs={Body2}>
                                        {price}
                                    </StyledPrice>
                                    {oldPrice && (
                                        <StyledPrice $type="old" stroke forwardedAs={Caption}>
                                            {oldPrice}
                                        </StyledPrice>
                                    )}
                                </StyledPrices>
                            )}
                            {quantity !== undefined && (
                                <StyledStepper
                                    value={quantity}
                                    step={quantityStep}
                                    min={quantityMin}
                                    max={quantityMax}
                                    onChange={onQuantityChange}
                                    $onTop={price !== undefined && quantity === 0}
                                    disabled={disabled}
                                />
                            )}
                        </StyledBottom>
                    )}
                </StyledCardContent>
            </CardBody>
        </StyledCard>
    );
});
