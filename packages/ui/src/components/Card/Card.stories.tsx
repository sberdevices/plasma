import React from 'react';
import styled from 'styled-components';

import ActionButton from '../ActionButton/ActionButton';
import Icon from '../Icon/Icon';

import Card from './Card';
import CardBadge from './CardBadge';
import CardContent from './CardContent';
import CardIndex from './CardIndex';
import CardLabel from './CardLabel';
import CardMedia from './CardMedia';
import CardPrice from './CardPrice';
import img1 from './img/001.png';

const StyledActionButton = styled(ActionButton)`
    position: absolute;
    top: -52px;
    right: 24px;
`;

const StyledCardBadge = styled(CardBadge)`
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 1;
`;

const StyledCard = styled(Card)`
    width: 392px;
    min-height: 592px;
`;

const StyledIndex = styled(CardIndex)`
    position: absolute;
    left: 16px;
    top: 16px;
`;

export default {
    title: 'Card',
};

export const Default = () => {
    return (
        <StyledCard id="1">
            <CardMedia src={img1} />
            <StyledIndex index={1} />
            <StyledCardBadge color="#F6650A">Осталось мало</StyledCardBadge>
            <CardContent>
                <StyledActionButton color="#08a652" size="large">
                    <Icon icon="plus" size="l" />
                </StyledActionButton>
                <CardLabel>Random item</CardLabel>
                <CardPrice price={120} oldPrice={190} count={3} />
            </CardContent>
        </StyledCard>
    );
};

export const Simple = () => {
    return (
        <Card id="1">
            <CardContent>
                <CardLabel>Lorem ipsum dolor sit amet consectetur adipisicing elit.</CardLabel>
                <CardLabel>
                    Blanditiis obcaecati nostrum quas reiciendis nemo nihil similique repudiandae ullam harum!
                </CardLabel>
            </CardContent>
        </Card>
    );
};
