import React from 'react';

import { startApp } from '../../testHelpers/testRenderHelpers';

import { Product } from './Product';
import { ProductProps } from './Product@common';
import { ProductEntity, ProductVariation } from './types';

export const product: ProductEntity = {
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

export const dummyFn = () => {};

export const actionButtonProps: ProductProps['actionButtonProps'] = {
    actionButtonText: 'Добавить в корзину',
    onClick: dummyFn,
    autoFocus: true,
};

export const variations: ProductVariation[] = [
    {
        id: 'color',
        name: 'Цвет',
        variations: ['Цветной пластик', 'Черный', 'Белый', 'Серый'],
        activeIndex: 0,
    },
];

export const recommendations = {
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

export function generateWrapper(passedProps?: Partial<ProductProps>) {
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

    cy.mockImage('[data-cy="ProductImage"] > img', 'images/img.png');
    cy.mockImage('[data-cy="ProductRecommendationsItem-image"] > img', 'images/img.png');
}
