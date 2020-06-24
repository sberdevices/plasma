import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { getTheme } from '../../theme/storiesTheme';
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

interface FullCardPreviewProps {
    disabled?: boolean;
    highlightOnFocus?: boolean;
    scaleOnFocus?: boolean;
}

const FullCardPreview: React.FC<FullCardPreviewProps> = ({ disabled, highlightOnFocus, scaleOnFocus }) => (
    <StyledCard disabled={disabled} highlightOnFocus={highlightOnFocus} scaleOnFocus={scaleOnFocus}>
        <CardMedia src={img1} disabled={disabled} />
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
    <ThemeProvider theme={getTheme()}>
        <FullCardPreview highlightOnFocus scaleOnFocus />
    </ThemeProvider>
);

export const NoScale = () => (
    <ThemeProvider theme={getTheme()}>
        <FullCardPreview highlightOnFocus />;
    </ThemeProvider>
);

export const Disabled = () => (
    <ThemeProvider theme={getTheme()}>
        <FullCardPreview disabled />;
    </ThemeProvider>
);

export const Simple = () => {
    return (
        <ThemeProvider theme={getTheme()}>
            <Card highlightOnFocus scaleOnFocus>
                <CardContent>
                    <CardLabel>Lorem ipsum dolor sit amet consectetur adipisicing elit.</CardLabel>
                    <CardLabel>
                        Blanditiis obcaecati nostrum quas reiciendis nemo nihil similique repudiandae ullam harum!
                    </CardLabel>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
};
