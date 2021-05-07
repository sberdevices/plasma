import React from 'react';
import styled from 'styled-components';
import { number, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Col, Row, Image, Header } from '@sberdevices/plasma-ui';

import { Description } from '../../types';

import { ProductPrice } from './ProductPrice/ProductPrice';
import { ProductTitle } from './ProductTitle/ProductTitle';
import { ProductActionButton } from './ProductActionButton/ProductActionButton';
import { ProductDescription } from './ProductDescription/ProductDescription';

export default {
    title: 'Product/Page Smart Home',
};

const items: Description[] = [
    {
        title: 'Цоколь',
        content: 'Е27',
    },
    {
        title: 'Световой поток',
        content: '860 лм',
    },
    {
        title: 'Цветов',
        content: '16 млн',
    },
    {
        title: 'Гарантия',
        content: '3 года',
    },
];

const smartLampSrc =
    'https://s3-alpha-sig.figma.com/img/4c47/743b/e662d2caa2212e804987ee04769e1102?Expires=1620000000&Signature=Mx4vIzOOfkab8twsDN53eEOfA9zLIUEf1qEa7YzvCYmOH9Moj8FbXmL5lQ6S6NL05nHY8e73xiMhMPnwV-Ct6x8c7ece9JMRqT5ByIcMkV5vctyqkjalTq223UhkAfLU1hY7wQ-YWtonX1lr2-Lmf0sjgUM0yl~V3MwFpU~WZAH4~mzfyiwDqriZZ9NFyJfPPMEQuSvUVlcAW4nE8OKDqyGyjSHvF2iGbw0xyIQFNA4LQuaqg9q8Ri1bD3uJmuqD~DzVOuWnNnE2FjPev-DvGvAyEQsYOtksbXmqg7SigFuixmvMIbgwW2zZuBjsB8DBGQn6vL04KdHO0pzzx1aGkw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA';

const StyledPrice = styled(ProductPrice)`
    margin-top: 32px;
    margin-bottom: 80px;
`;

const StyledDescription = styled(ProductDescription)`
    margin-bottom: 80px;
`;

export const Default = (): React.ReactElement => {
    const price = number('price', 890);
    const oldPrice = number('old price', 1010);
    const descriptionLayout = select('layout', ['row', 'column'], 'row');
    const quantity = number('quantity', 1);
    const actionButtonText = text('action button text', 'Купить');

    return (
        <>
            <Header title="Sber" />
            <Row>
                <Col sizeXL={7} sizeM={4}>
                    <ProductTitle title={text('title', 'Умная лампа Sber')} />
                    <StyledPrice price={price} oldPrice={oldPrice} />
                    <StyledDescription layout={descriptionLayout} items={items} />
                    <ProductActionButton
                        quantity={quantity}
                        autoFocus
                        withQuantity
                        actionButtonText={actionButtonText}
                        onChangeQuantity={action('onChangeQuantity')}
                        onClick={action('onClickActionButton')}
                    />
                </Col>
                <Col sizeXL={5} sizeM={2}>
                    <Image base="div" src={smartLampSrc} ratio="1 / 1" />
                </Col>
            </Row>
        </>
    );
};
