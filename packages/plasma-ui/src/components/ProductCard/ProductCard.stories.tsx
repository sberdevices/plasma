import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';

import { InSpacingDecorator } from '../../helpers';
import { Badge } from '../Badge';
import { CardMedia } from '../Card/CardMedia';

import { ProductCard } from '.';
import type { ProductCardProps } from '.';

export default {
    title: 'Content/ProductCard',
    decorators: [InSpacingDecorator],
} as Meta;

// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/class-name-casing
interface Product_CardProps extends ProductCardProps {
    'media:src'?: string;
    'media:alt'?: string;
    'badge:text'?: string;
    'example:cardWidth'?: string | number;
}

// eslint-disable-next-line @typescript-eslint/camelcase
export const Product_Card: Story<Product_CardProps> = ({
    'media:src': imageSrc,
    'media:alt': imageAlt,
    'badge:text': badgeText,
    'example:cardWidth': cardWidth,
    quantity: q,
    ...rest
}) => {
    const [state, setState] = useState({
        quantity1: q,
        quantity2: 0,
        quantity3: 0,
        quantity4: 1,
        quantity5: 0,
    });

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(5, ${cardWidth})`,
                gap: '1rem',
                alignItems: 'flex-start',
            }}
        >
            <ProductCard
                {...rest}
                badge={<Badge text={badgeText} size="l" />}
                media={<CardMedia src={imageSrc} alt={imageAlt} width="12.25rem" height="12.25rem" />}
                quantity={state.quantity1}
                onQuantityChange={(quantity) => setState((s) => ({ ...s, quantity1: quantity }))}
            />
            <ProductCard
                badge={<Badge view="warning" text="Больше нет" size="l" />}
                media={<CardMedia src="./images/320_320_1.jpg" width="12.25rem" height="12.25rem" />}
                text="Беконайзер с сыром, зеленью, большой котлет..."
                price={89}
                oldPrice={100}
                quantity={state.quantity2}
                onQuantityChange={(quantity) => setState((s) => ({ ...s, quantity2: quantity }))}
            />
            <ProductCard
                disabled
                badge={<Badge text="Раскупили" size="l" />}
                media={<CardMedia src="./images/320_320_2.jpg" width="12.25rem" height="12.25rem" />}
                text="Смартфон Midnight Midnight 13 128GB Midnight"
                price={79_289}
                oldPrice={89_109}
                quantity={state.quantity3}
                onQuantityChange={(quantity) => setState((s) => ({ ...s, quantity3: quantity }))}
            />
            <ProductCard
                disabled
                badge={<Badge text="Раскупили" size="l" />}
                media={<CardMedia src="./images/320_320_2.jpg" width="12.25rem" height="12.25rem" />}
                text="Смартфон Midnight Midnight 13 128GB Midnight"
                price={79_289}
                oldPrice={89_109}
                quantity={state.quantity4}
                onQuantityChange={(quantity) => setState((s) => ({ ...s, quantity4: quantity }))}
            />
            <ProductCard
                badge={<Badge text="Популярный" size="l" />}
                media={<CardMedia src="./images/320_320_3.jpg" width="12.25rem" height="12.25rem" />}
                text="Большой весенний букет"
                price={7_555}
                quantity={state.quantity5}
                onQuantityChange={(quantity) => setState((s) => ({ ...s, quantity5: quantity }))}
                backgroundColor="#A07589"
            />
        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/camelcase
Product_Card.args = {
    text: 'Молоко в деревне ультрапастеризованное Моментики 925 мл',
    price: 69,
    quantity: 0,
    quantityStep: 1,
    quantityMin: 0,
    quantityMax: 10,
    'media:src': './images/320_320_0.jpg',
    'media:alt': '',
    'badge:text': '-20%',
    'example:cardWidth': '12.25rem',
};
