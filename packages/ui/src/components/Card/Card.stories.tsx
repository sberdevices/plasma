import React, { useState } from 'react';
import styled from 'styled-components';
import { text, boolean } from '@storybook/addon-knobs';

import { Icon } from '../Icon/Icon';
import { Row, Col } from '../Grid/Grid';
import { Button } from '../Button/Button';
import { ActionButton } from '../Button/ActionButton';

import { Card } from './Card';
import { CardBody } from './CardBody';
import { CardBadge } from './CardBadge';
import { CardContent } from './CardContent';
import { CardMedia } from './CardMedia';
import { CardPrice } from './CardPrice';
import { CardHeadline1, CardHeadline3, CardBody1, CardFootnote1 } from './CardTypography';

const StyledActionButton = styled(ActionButton)`
    box-sizing: border-box;
    position: absolute;
    top: -52px;
    right: 24px;
`;

const StyledCard = styled(Card)`
    box-sizing: border-box;
    width: 392px;
`;

const StyledDivider = styled.div`
    box-sizing: border-box;
    flex: 1;
`;

const StyledCardContent = styled(CardContent)`
    display: flex;
    box-sizing: border-box;
    flex-direction: column;

    height: 200px;
`;

const StyledCardIndex = styled(CardBadge)`
    top: 8px;
    left: 8px;
    box-sizing: border-box;
`;

const StyledCardBadge = styled(CardBadge)`
    top: 16px;
    right: 16px;
    box-sizing: border-box;
`;

const galleryItems = [
    {
        image: './images/001.png',
        caption: 'Первый канал',
    },
    {
        image: './images/001.png',
        caption: 'Второй канал',
    },
    {
        image: './images/001.png',
        caption: 'Третий канал',
    },
];

export default {
    title: 'Card',
};

export const Default = () => (
    <Card style={{ width: '640px' }} tabIndex={0} highlightOnFocus>
        <CardBody>
            <CardMedia src="./images/001.png" height={392} />
            <CardContent cover={boolean('cover', false)}>
                <CardHeadline3>{text('h3', 'Потребительский кредит')}</CardHeadline3>
                <CardHeadline1>{text('h1', 'до 230 000 ₽')}</CardHeadline1>
                <CardFootnote1 view="secondary">{text('footer', 'На 18 месяцев, ставка 13,9%')}</CardFootnote1>
                <Button
                    text="Label"
                    view="primary"
                    size="s"
                    motion={false}
                    fullWidth
                    style={{ marginTop: '1em' }}
                    tabIndex={-1}
                />
            </CardContent>
        </CardBody>
    </Card>
);

export const FullPreview = () => (
    <StyledCard
        highlightOnFocus={boolean('highlightOnFocus', false)}
        scaleOnFocus={boolean('scaleOnFocus', false)}
        focused={boolean('focused', false)}
        tabIndex={0}
    >
        <CardBody>
            <CardMedia src="./images/001.png" height={392} disabled={boolean('disabled', false)} />
            <StyledCardIndex view="secondary" size="xl">
                1
            </StyledCardIndex>
            <StyledCardBadge view="warning">Осталось мало</StyledCardBadge>
            <StyledCardContent disabled={boolean('disabled', false)}>
                <StyledActionButton size="l" motion={false}>
                    <Icon icon="plus" />
                </StyledActionButton>
                <CardBody1>Random item</CardBody1>
                <StyledDivider />
                <CardPrice price={1234} oldPrice={1987} count={3} />
            </StyledCardContent>
        </CardBody>
    </StyledCard>
);

export const Simple = () => {
    return (
        <Card highlightOnFocus scaleOnFocus tabIndex={0}>
            <CardBody>
                <CardContent>
                    <CardBody1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</CardBody1>
                    <CardBody1>Blanditiis obcaecati nostrum quas reiciendis nemo nihil</CardBody1>
                </CardContent>
            </CardBody>
        </Card>
    );
};

export const Gallery = () => {
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    return (
        <Row>
            {galleryItems.map((item, i) => (
                <Col size={4}>
                    <Card
                        key={i}
                        onFocus={() => setFocusedIndex(i)}
                        onBlur={() => setFocusedIndex(null)}
                        tabIndex={0}
                        highlightOnFocus
                    >
                        <CardBody>
                            <CardMedia src={item.image} height={392} />
                            <StyledCardIndex view="secondary" size="xl">
                                {i + 1}
                            </StyledCardIndex>
                        </CardBody>
                    </Card>
                    <CardFootnote1 view={i === focusedIndex ? 'primary' : 'tertiary'}>{item.caption}</CardFootnote1>
                </Col>
            ))}
        </Row>
    );
};
