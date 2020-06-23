import React from 'react';
import styled from 'styled-components';

import Story from '../../helpers/Story';
import ActionButton from '../ActionButton/ActionButton';
import Icon from '../Icon/Icon';

import Card, { CardProps } from './Card';
import CardBadge from './CardBadge';
import CardContent from './CardContent';
import CardIndex from './CardIndex';
import CardLabel from './CardLabel';
import CardMedia from './CardMedia';
import CardPrice from './CardPrice';

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
    height: 200px;
    display: flex;
    flex-direction: column;
`;

export default {
    title: 'Card',
};

interface FullCardPreviewProps extends CardProps {
    disabled?: boolean;
}

const FullCardPreview: React.FC<FullCardPreviewProps> = ({ disabled, ...cardProps }) => (
    <StyledCard {...cardProps}>
        <CardMedia src="/images/001.png" disabled={disabled} />
        <CardIndex index={1} position="top-left" />

        <CardBadge color="#F6650A" position="top-right">
            Осталось мало
        </CardBadge>

        <StyledCardContent disabled={disabled}>
            <StyledActionButton size="l">
                <Icon icon="plus" />
            </StyledActionButton>
            <CardLabel>Random item</CardLabel>
            <StyledDivider />
            <CardPrice price={120} oldPrice={190} count={3} />
        </StyledCardContent>
    </StyledCard>
);

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
                <CardContent>
                    <CardLabel>Lorem ipsum dolor sit amet consectetur adipisicing elit.</CardLabel>
                    <CardLabel>
                        Blanditiis obcaecati nostrum quas reiciendis nemo nihil similique repudiandae ullam harum!
                    </CardLabel>
                </CardContent>
            </Card>
        </Story>
    );
};
