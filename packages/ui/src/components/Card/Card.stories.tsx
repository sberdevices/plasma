import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Story from '../../helpers/Story';
import { ActionButton } from '../ActionButton/ActionButton';
import { Icon } from '../Icon/Icon';
import { getTheme } from '../../helpers/theme';

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

interface FullCardPreviewProps extends CardProps {
    disabled?: boolean;
}

const FullCardPreview: React.FC<FullCardPreviewProps> = ({ disabled, ...cardProps }) => (
    <StyledCard {...cardProps}>
        <CardBody>
            <CardMedia src="./images/001.png" disabled={disabled} />
            <StyledCardIndex>1</StyledCardIndex>

            <CardBadge color="accent" position="top-right">
                Осталось мало
            </CardBadge>

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
        <ThemeProvider theme={getTheme()}>
            <FullCardPreview highlightOnFocus scaleOnFocus tabIndex={0} />
        </ThemeProvider>
    </Story>
);

export const NoScale = () => (
    <Story>
        <ThemeProvider theme={getTheme()}>
            <FullCardPreview highlightOnFocus tabIndex={0} />
        </ThemeProvider>
    </Story>
);

export const Disabled = () => (
    <Story>
        <ThemeProvider theme={getTheme()}>
            <FullCardPreview disabled />
        </ThemeProvider>
    </Story>
);

export const AlwaysFocused = () => (
    <Story>
        <ThemeProvider theme={getTheme()}>
            <FullCardPreview highlightOnFocus focused />
        </ThemeProvider>
    </Story>
);

export const Simple = () => {
    return (
        <Story>
            <ThemeProvider theme={getTheme()}>
                <Card highlightOnFocus scaleOnFocus tabIndex={0}>
                    <CardContent>
                        <CardBody>
                            <CardLabel>Lorem ipsum dolor sit amet consectetur adipisicing elit.</CardLabel>
                            <CardLabel>Blanditiis obcaecati nostrum quas reiciendis nemo nihil</CardLabel>
                        </CardBody>
                    </CardContent>
                </Card>
            </ThemeProvider>
        </Story>
    );
};
