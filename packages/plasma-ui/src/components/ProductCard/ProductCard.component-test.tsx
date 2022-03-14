import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

const src = 'https://plasma.sberdevices.ru/ui-storybook/images/320_320_0.jpg';

describe('plasma-ui: ProductCard', () => {
    const Badge = getComponent('Badge');
    const CardMedia = getComponent('CardMedia');
    const ProductCard = getComponent('ProductCard');

    it('default', () => {
        mount(
            <CypressTestDecorator>
                <ProductCard
                    style={{ width: '12.25rem' }}
                    badge={<Badge text="-20%" size="l" />}
                    media={<CardMedia src={src} alt="Молоко" width="12.25rem" height="12.25rem" />}
                    text="Молоко в деревне ультрапастеризованное Моментики 925 мл"
                    price={69}
                    quantity={0}
                />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('positive quantity', () => {
        mount(
            <CypressTestDecorator>
                <ProductCard
                    style={{ width: '12.25rem' }}
                    badge={<Badge text="-20%" size="l" />}
                    media={<CardMedia src={src} alt="Молоко" width="12.25rem" height="12.25rem" />}
                    text="Беконайзер с сыром, зеленью, большой котлет..."
                    price={89}
                    oldPrice={100}
                    quantity={1}
                />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('disabled', () => {
        mount(
            <CypressTestDecorator>
                <ProductCard
                    style={{ width: '12.25rem' }}
                    badge={<Badge text="Больше нет" view="warning" size="l" />}
                    media={<CardMedia src={src} alt="Молоко" width="12.25rem" height="12.25rem" />}
                    text="Смартфон Midnight Midnight 13 128GB Midnight"
                    price={79_289}
                    oldPrice={89_109}
                    quantity={1}
                    disabled
                />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('custom color', () => {
        mount(
            <CypressTestDecorator>
                <ProductCard
                    style={{ width: '12.25rem' }}
                    badge={<Badge text="Больше нет" view="warning" size="l" />}
                    media={<CardMedia src={src} alt="Молоко" width="12.25rem" height="12.25rem" />}
                    text="Большой весенний букет"
                    price={7_555}
                    quantity={1}
                    backgroundColor="#A07589"
                />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
