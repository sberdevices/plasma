import React from 'react';
import styled from 'styled-components';
import { Card, CardBody, CardContent, CardMedia, Col } from '@sberdevices/plasma-ui';
import { isSberBox } from '@sberdevices/plasma-ui/utils';

export interface GridCardProps {
    url: string;
    text: string;
    order: number;
    onClick: () => void;
    onKeyDown: React.KeyboardEventHandler;
}

const StyledCol = styled(Col)`
    margin-bottom: 56px;
`;

export const GridCard = React.forwardRef<HTMLDivElement, GridCardProps>(
    // eslint-disable-next-line prefer-arrow-callback
    function GridCard({ url, text: title, onClick, onKeyDown }, ref) {
        return (
            <StyledCol sizeXL={4} sizeM={2}>
                <Card
                    outlined={isSberBox()}
                    tabIndex={0}
                    onClick={onClick}
                    onKeyDown={onKeyDown}
                    ref={ref}
                    data-cy="grid-item-card"
                >
                    <CardBody>
                        <CardMedia base="div" src={url} ratio="1 / 1" data-cy="grid-item-card-media" />
                        <CardContent cover>{title}</CardContent>
                    </CardBody>
                </Card>
            </StyledCol>
        );
    },
);
