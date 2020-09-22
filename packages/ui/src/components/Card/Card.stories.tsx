import React from 'react';
import styled from 'styled-components';

import Story from '../../helpers/Story';
import { ActionButton } from '../ActionButton/ActionButton';
import { Icon } from '../Icon/Icon';

import { Card, CardProps } from './Card';
import { CardBody } from './CardBody';
import { CardBadge } from './CardBadge';
import { CardContent } from './CardContent';
import { CardIndex } from './CardIndex';
import { CardLabel } from './CardLabel';
import { CardMedia } from './CardMedia';
import { CardPrice } from './CardPrice';

const StyledActionButton = styled(ActionButton)`
    position: absolute;
    top: -52px;
    right: 24px;
`;

const StyledCard = styled(Card)`
    width: 392px;
`;

const StyledDivider = styled.div`
    flex: 1;
`;

const StyledCardContent = styled(CardContent)`
    display: flex;
    flex-direction: column;

    height: 200px;
`;

const StyledCardIndex = styled(CardIndex)`
    top: 8px;
    left: 8px;
`;

const StyledCardBadge = styled(CardBadge)`
    top: 16px;
    right: 16px;
`;

interface FullCardPreviewProps extends CardProps {
    disabled?: boolean;
}

const FullCardPreview: React.FC<FullCardPreviewProps> = ({ disabled, ...cardProps }) => (
    <StyledCard {...cardProps}>
        <CardBody>
            <CardMedia src="./images/001.png" disabled={disabled} />
            <StyledCardIndex>1</StyledCardIndex>

            <StyledCardBadge color="accent">Осталось мало</StyledCardBadge>

            <StyledCardContent disabled={disabled}>
                <StyledActionButton size="l">
                    <Icon icon="plus" />
                </StyledActionButton>
                <CardLabel>Random item</CardLabel>
                <StyledDivider />
                <CardPrice price={1234} oldPrice={1987} count={3} />
            </StyledCardContent>
        </CardBody>
    </StyledCard>
);

export default {
    title: 'Card',
};

export const Default = () => (
    <Story>
        <FullCardPreview highlightOnFocus scaleOnFocus tabIndex={0} />
    </Story>
);

export const NoScale = () => (
    <Story>
        <FullCardPreview highlightOnFocus tabIndex={0} />
    </Story>
);

export const Disabled = () => (
    <Story>
        <FullCardPreview disabled />
    </Story>
);

export const AlwaysFocused = () => (
    <Story>
        <FullCardPreview highlightOnFocus focused />
    </Story>
);

export const Simple = () => {
    return (
        <Story>
            <Card highlightOnFocus scaleOnFocus tabIndex={0}>
                <CardBody>
                    <CardContent>
                        <CardLabel>Lorem ipsum dolor sit amet consectetur adipisicing elit.</CardLabel>
                        <CardLabel>Blanditiis obcaecati nostrum quas reiciendis nemo nihil</CardLabel>
                    </CardContent>
                </CardBody>
            </Card>
        </Story>
    );
};
