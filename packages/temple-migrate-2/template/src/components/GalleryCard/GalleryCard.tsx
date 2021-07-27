import React from 'react';
import styled, { css } from 'styled-components';
import { CardPrice, CardBody2, CardContent, CardBadge, Card, CardBody, CardMedia } from '@sberdevices/plasma-ui';
import { GalleryCardProps, getMediaObjectSrc } from '@sberdevices/plasma-temple';
import { mediaQuery } from '@sberdevices/plasma-ui/utils';

import { Product } from '../../types';

const StyledPrice = styled(CardPrice)`
    & > span {
        height: unset;
    }
`;

const StyledCardTitle = styled(CardBody2)`
    height: 80px;
`;

const StyledCardContent = styled(CardContent)`
    display: flex;
    flex: 1;
    flex-direction: column;

    min-height: 200px;
`;

const StyledBadge = styled(CardBadge)`
    left: 0.5rem;
    top: 0.5rem;
`;

const StyledCard = styled(Card)`
    width: 392px;

    ${mediaQuery(
        'M',
        2,
    )(
        css`
            width: 332px;
        `,
    )}
`;

export const GalleryCard: React.FC<GalleryCardProps<Product>> = React.memo(({ card, focused }) => {
    const { label, price, position, image } = card;

    return (
        <StyledCard data-cy="gallery-card" focused={focused}>
            <CardBody>
                <CardMedia data-cy="gallery-card-image-mock" src={getMediaObjectSrc(image)} ratio="1 / 1" base="div" />
                <StyledBadge view="secondary" size="l" text={String(position)} />
                <StyledCardContent>
                    <StyledCardTitle>{label}</StyledCardTitle>
                    <StyledPrice price={price.value} currency="rub" />
                </StyledCardContent>
            </CardBody>
        </StyledCard>
    );
});
