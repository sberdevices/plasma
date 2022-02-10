import React from 'react';
import { Col, Row } from '@sberdevices/plasma-ui';

import { ProductDetails } from './ProductDetails';
import { DetailsItemProps } from './ProductDetailsItem/ProductDetailsItem';
import { ExpandableProductDetails } from './ExpandableProductDetails/ExpandableProductDetails';

export default {
    title: 'Product/Details',
};

const details: DetailsItemProps[] = [
    {
        name: 'Цоколь',
        value: 'Е27',
    },
    {
        name: 'Световой поток',
        value: '860 лм',
    },
    {
        name: 'Цветов',
        value: '16 млн',
    },
    {
        name: 'Гарантия',
        value: '2 года',
    },
    {
        name: 'заголовок',
        value: 'длинное описание @@@',
    },
    {
        name: 'заголовок',
        value: 'Очень очень длинное описание',
    },
    {
        name: 'очень длинный заголовок',
        value: 'Очень очень длинное описание',
    },
    {
        name: 'Габариты контроллера (д×ш×в)',
        value: '64 × 24 × 11,7 мм',
    },
    {
        name: 'Размер без учёта крепления на DIN-рейку (ш × г × в)',
        value: '46 × 46 × 18 мм',
    },
    {
        name: 'Без контента',
        value: '',
    },
];

const Container: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
    <Row>
        <Col sizeXL={7} sizeM={4} sizeS={4}>
            {children}
        </Col>
    </Row>
);

export const Default = (): React.ReactElement => {
    return (
        <Container>
            <ProductDetails details={details} title="Подробные характеристики" />
        </Container>
    );
};

export const Expandable = (): React.ReactElement => {
    return (
        <Container>
            <ExpandableProductDetails details={details} fixedLines={5} title="Подробные характеристики" />
        </Container>
    );
};
