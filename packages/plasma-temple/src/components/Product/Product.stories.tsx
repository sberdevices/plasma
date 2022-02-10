import React from 'react';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';
import { Button, Header } from '@sberdevices/plasma-ui';
import { IconCart } from '@sberdevices/plasma-icons';

import { Product } from './Product';
import { ProductEntity } from './types';
import { recommendations } from './ProductRecommendations/ProductRecommendations.stories';

export default {
    title: 'Product/Product',
};

const product: ProductEntity = {
    id: 'id',
    name: 'Длинное название в несколько строк и больше',
    price: 68.9,
    oldPrice: 70.9,
    shortDetails: [
        { name: 'Производитель', value: 'Gans Puzzles' },
        { name: 'Сложность', value: 'Средняя' },
        { name: 'Материал', value: 'Пластик' },
        { name: 'Магниты', value: 'Есть' },
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

const StyledProduct = styled(Product)`
    height: calc(100vh - 5rem);
`;

export const Default = (): React.ReactElement => {
    const [variations, setVariations] = React.useState([
        {
            id: 'color',
            name: 'Цвет',
            variations: ['Цветной пластик', 'Черный', 'Белый', 'Серый'],
            activeIndex: 0,
        },
        {
            id: 'size',
            name: 'Размер',
            variations: ['S', 'M', 'L', 'XXL'],
            activeIndex: 0,
        },
    ]);

    const onChangeVariation = (id: unknown, activeIndex: number) => {
        const index = variations.findIndex((variation) => id === variation.id);

        if (index > -1) {
            setVariations([
                ...variations.slice(0, index),
                { ...variations[index], activeIndex },
                ...variations.slice(index + 1),
            ]);
        }
    };

    return (
        <>
            <Header back>
                <Button size="s" view="clear" contentLeft={<IconCart />} text="Корзина" />
            </Header>
            <StyledProduct
                product={product}
                actionButtonProps={{
                    actionButtonText: 'Добавить в корзину',
                    onClick: action('onActionButtonClick'),
                    autoFocus: true,
                }}
                variations={variations}
                onChangeVariation={onChangeVariation}
                recommendations={{ title: 'Похожие товары', items: recommendations }}
                onClickRecommendation={action('onClickRecommendations')}
            />
        </>
    );
};
