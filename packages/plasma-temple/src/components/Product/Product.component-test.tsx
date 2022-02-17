import React from 'react';

import { startApp } from '../../testHelpers/testRenderHelpers';

import { Product } from './Product';
import { ProductProps } from './Product@common';
import { ActionButtonSelector } from './ProductActionButton/ProductActionButton';
import { ProductEntity, ProductVariation } from './types';

const product: ProductEntity = {
    id: 'id',
    name: 'Длинное название в несколько строк и больше',
    price: 68.9,
    oldPrice: 70.9,
    shortDetails: [
        { name: 'Производитель', value: 'Очень очень длинное название' },
        { name: 'Сложность', value: 'Средняя' },
    ],
    details: {
        title: 'Подробные характеристики',
        values: [
            { name: 'Производитель', value: 'Gans Puzzles' },
            { name: 'Сложность', value: 'Средняя' },
            { name: 'Материал', value: 'Пластик' },
            { name: 'Магниты', value: 'Есть' },
            { name: 'Гарантия', value: '1 год' },
            { name: 'Условия хранения', value: '+25' },
            { name: 'Наклейки', value: 'Есть' },
        ],
    },
    description: {
        title: 'Описание',
        content:
            'Gan делают круто, это уже аксиома. Первый кубик Рубика со сменными магнитами долго ждали, было интересно, как удастся сделать это. Ган сделали все максимально грамотно, и хоть Gan 356 X Numerical IPG 3x3x3 стоит немало, тому есть объяснение. Но перед тем, как обсуждать комплектацию и кручение, стоит разобраться в названии. Numerical IPG означает, что здесь используется новая, отличная от Gan 354 M, крестовина. К ней подходят другие гайки, которые можно закрутить даже пальцами. При этом система отдаленно напоминает систему регулировки как в GTS 3M. А вот теперь время поговорить о комплектации, ведь она поражает. Самое главное – вы получаете упаковку сменных магнитов и гаек. Не забывайте, в кубе тоже установлены магниты и гайки, это четвертая вариация. Также Gan положили пластиковый бокс, визитку и инструкцию.',
    },
    images: ['images/img.png', 'images/placeholder.png'],
};

const dummyFn = () => {};

const actionButtonProps: ProductProps['actionButtonProps'] = {
    actionButtonText: 'Добавить в корзину',
    onClick: dummyFn,
    autoFocus: true,
};

const variations: ProductVariation[] = [
    {
        id: 'color',
        name: 'Цвет',
        variations: ['Цветной пластик', 'Черный', 'Белый', 'Серый'],
        activeIndex: 0,
    },
];

const recommendations = {
    title: 'Похожие товары',
    items: [
        {
            id: '1',
            name: 'Название',
            price: 990,
            oldPrice: 17200,
            images: ['images/img.png'],
        },
        {
            id: '2',
            name: 'Очень длинное название',
            nameDetails: '1л',
            price: 990,
            oldPrice: 17200,
            images: ['images/img.png'],
        },
        {
            id: '3',
            name: 'Очень очень длинное название',
            price: 990.9,
            oldPrice: 17200,
            images: ['images/img.png'],
        },
    ],
};

function generateWrapper(passedProps?: Partial<ProductProps>) {
    const defaultProps: ProductProps = {
        product,
        defaultImage: 'images/placeholder.png',
        actionButtonProps,
        variations,
        recommendations,
    };

    const props = { ...defaultProps, ...passedProps };

    startApp(
        [
            {
                name: 'form',
                component: () => <Product {...props} />,
            },
        ],
        ({ pushScreen }) => pushScreen('form'),
    );

    cy.mockImage('[data-cy="ProductImage"] > img', 'images/placeholder.png');
    cy.mockImage('[data-cy="ProductRecommendationsItem-image"] > img', 'images/placeholder.png');
}

describe('Product', () => {
    it('render product', () => {
        generateWrapper();
        cy.matchImageSnapshot();
    });

    it('render short content (not expanded)', () => {
        generateWrapper({
            product: {
                ...product,
                shortDetails: undefined,
                details: { ...product.details, values: product.details.values.slice(0, 2) },
                description: { ...product.description, content: 'Короткое описание' },
            },
            variations: undefined,
        });
        cy.matchImageSnapshot();
    });

    it('render recommendations', () => {
        generateWrapper({
            product: {
                ...product,
                details: undefined,
                shortDetails: undefined,
                description: { ...product.description, content: 'Короткое описание' },
            },
            variations: undefined,
        });
        cy.matchImageSnapshot();
    });

    it('click on action button', () => {
        const onClickStub = cy.stub();
        generateWrapper({
            actionButtonProps: { ...actionButtonProps, onClick: onClickStub },
        });
        cy.get(`[data-name="${ActionButtonSelector.ActionButton}"]`)
            .click()
            .then(() => {
                expect(onClickStub).to.be.calledOnce;
            });
    });

    describe('action button with quantity', () => {
        let onChangeQuantityStub;

        beforeEach(() => {
            onChangeQuantityStub = cy.stub();

            generateWrapper({
                actionButtonProps: {
                    ...actionButtonProps,
                    withQuantity: true,
                    quantity: 1,
                    onChangeQuantity: onChangeQuantityStub,
                },
            });
        });

        it('render action button with quantity', () => {
            cy.matchImageSnapshot();
        });

        it('click minus action button', () => {
            cy.get(`[data-name="${ActionButtonSelector.MinusButton}"]`)
                .click()
                .then(() => {
                    expect(onChangeQuantityStub).to.be.calledOnceWith(-1);
                });
        });

        it('click plus action button', () => {
            cy.get(`[data-name="${ActionButtonSelector.PlusButton}"]`)
                .click()
                .then(() => {
                    expect(onChangeQuantityStub).to.be.calledOnceWith(1);
                });
        });
    });

    it('click on variation button', () => {
        const onChangeVariationStub = cy.stub();

        generateWrapper({
            onChangeVariation: onChangeVariationStub,
        });

        cy.get('[data-cy="ProductVariationItem-button"]')
            .first()
            .click()
            .then(() => {
                expect(onChangeVariationStub).to.be.calledOnce;
            });
    });

    it('click on more button details', () => {
        generateWrapper({
            product: { ...product, description: undefined },
        });

        cy.get('[data-cy="ProductToggleButton"]').scrollIntoView().click();

        cy.matchImageSnapshot();
    });

    it('click on more button description', () => {
        generateWrapper({
            product: { ...product, details: undefined },
        });

        cy.get('[data-cy="ProductToggleButton"]').scrollIntoView().click();

        cy.matchImageSnapshot();
    });

    it('click on recommendation', () => {
        const onClickRecommendationStub = cy.stub();

        generateWrapper({
            onClickRecommendation: onClickRecommendationStub,
            product: { ...product, description: undefined, details: undefined, shortDetails: undefined },
        });

        cy.get('[data-cy="ProductRecommendationsItem"]')
            .first()
            .click()
            .then(() => {
                expect(onClickRecommendationStub).to.be.calledOnceWith(recommendations.items[0], 0);
            });
    });
});
