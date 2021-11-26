import React from 'react';
import styled from 'styled-components';
import { number, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Col, Row, Image, Header } from '@sberdevices/plasma-ui';
import { isSberPortal, formatCurrency } from '@sberdevices/plasma-ui/utils';
import { white } from '@sberdevices/plasma-tokens';

import { Description } from '../../types';

import { ProductPrice } from './ProductPrice/ProductPrice';
import { ProductTitle } from './ProductTitle/ProductTitle';
import { ProductActionButton } from './ProductActionButton/ProductActionButton';
import { ProductDescription } from './ProductDescription/ProductDescription';

export default {
    title: 'Product/Page Samokat',
};

const items: Description[] = [
    {
        title: 'Состав',
        content: 'Молоко нормализованное',
    },
    {
        title: 'Срок и условия хранения',
        content: '6 месяцев, при температуре от +2°C до +25°C',
    },
    {
        title: 'Производитель',
        content: 'Вимм-Билль-Данн, Россия',
    },
    {
        title: 'Гарантия',
        content: '2 года',
    },
];

const itemsProteins: Description[] = [
    {
        title: 'ккал',
        content: '325',
    },
    {
        title: 'белки',
        content: '11',
    },
    {
        title: 'жиры',
        content: '17,6',
    },
    {
        title: 'углеводы',
        content: '30,7',
    },
];

const milkSrc =
    'https://s3-alpha-sig.figma.com/img/aa27/ade9/e69990c3b8d1719abb433654915b23dc?Expires=1620000000&Signature=dqnt0FnPaOKShnf~XIhQzZcViVPKd1CHTlLlV6R4SY8XFExwvR~xDQmHaVpvabRHIKgrmOA9SWUfpgXfexbDcJ4POxEQly8A1LMyotKLGMGlMA0-IUNP8J3vv6xBdZD4YL6bDsj1klhx7So9SpTWrYW~shTHEMAn-y2ZAEkN3tIS-tDsVz6XQLQtCd1xM8womXgtEbBMtnNr~fO1jEIBzkh2l5spi4fadj9nu6q4wCOLUuHGFe-oTFVfGM-bPe0vavo5djq269vlPlGHXjhcxSCbpb2bEENg6uUnPcLUGg1yNuev9YtPJ4p6dg3N8t1DkamOrlubvzqSgid6cWOjhg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA';

const StyledPrice = styled(ProductPrice)`
    margin-top: 32px;
    margin-bottom: 80px;
`;

const StyledActionButton = styled(ProductActionButton)`
    margin-bottom: 56px;
`;

const ImageContainer = styled.div`
    border-radius: 20px;
    background-color: ${white};
    padding: ${isSberPortal() ? 32 : 58}px;
    width: ${isSberPortal() ? 330 : 534}px;
`;

export const Default = (): React.ReactElement => {
    const price = number('price', 68.9);
    const oldPrice = number('old price', 70.9);
    const quantity = number('quantity', 2);
    const actionButtonText = text('action button text', 'Добавить');

    return (
        <>
            <Header />
            <Row>
                <Col sizeXL={7} sizeM={4}>
                    <ProductTitle title={text('title', 'Молоко Домик в деревне ультрапастеризованное 2.5% 925 мл')} />
                    <StyledPrice price={price} oldPrice={oldPrice} />
                    <StyledActionButton
                        quantity={quantity}
                        autoFocus
                        withQuantity
                        actionButtonText={actionButtonText}
                        onChangeQuantity={action('onChangeQuantity')}
                        onClick={action('onClickActionButton')}
                        contentRight={formatCurrency(price, 'rub', 2)}
                    />
                    <ProductDescription layout="column" items={items} />
                    <ProductDescription layout="row" items={itemsProteins} />
                </Col>
                <Col sizeXL={5} sizeM={2}>
                    <ImageContainer>
                        <Image base="div" src={milkSrc} ratio="1 / 1" />
                    </ImageContainer>
                </Col>
            </Row>
        </>
    );
};
