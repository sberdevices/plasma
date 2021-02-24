import React from 'react';
import styled from 'styled-components';
import { Footnote1 } from '@sberdevices/ui/components/Typography';
import { Col } from '@sberdevices/ui/components/Grid';
import { Card, CardBadge, CardBody, CardMedia } from '@sberdevices/ui/components/Card';
import { isSberBox } from "@sberdevices/ui/utils";

export interface ItemEntityProps {
    url: string;
    title: string;
    order: number;
    onClick: () => void;
}

const StyledFootnote1 = styled(Footnote1)`
    margin-top: 20px;
`;

const StyledCardBadge = styled(CardBadge)`
    position: absolute;
    top: 16px;
    right: 16px;
`;

const StyledCol = styled(Col)`
    margin-bottom: 56px;
`;

export const ItemEntity = React.forwardRef<HTMLDivElement, ItemEntityProps>(
    // eslint-disable-next-line prefer-arrow-callback
    function ItemEntity({ url, title, onClick, order }, ref) {
        return (
            <StyledCol sizeXL={3} sizeM={2}>
                <Card outlined={isSberBox()} tabIndex={0} onClick={onClick} ref={ref} data-cy="item-entity-card">
                    <CardBody>
                        <CardMedia src={url} ratio="1:1" data-cy="item-entity-card-media" />
                        <StyledCardBadge view="index" size="l" text={`${order}`} />
                    </CardBody>
                </Card>
                <StyledFootnote1>{title}</StyledFootnote1>
            </StyledCol>
        );
    },
);
