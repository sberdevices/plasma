import React from 'react';
import styled from 'styled-components';
import { Card, CardBadge, CardBody, CardMedia, Col, Footnote1 } from '@sberdevices/plasma-ui';

import { isSberBoxLike } from '../../../../utils/deviceFamily';

export interface ItemEntityProps {
    url: string;
    title: string;
    order: number;
    onClick: () => void;
    onFocus?: () => void;
    onKeyDown: React.KeyboardEventHandler;
    [key: string]: unknown;
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

/** @deprecated */
export const ItemEntity = React.forwardRef<HTMLDivElement, ItemEntityProps>(
    // eslint-disable-next-line prefer-arrow-callback
    function ItemEntity({ url, title, onClick, onFocus, onKeyDown, order }, ref) {
        return (
            <StyledCol sizeXL={3} sizeM={2}>
                <Card
                    outlined={isSberBoxLike()}
                    tabIndex={0}
                    onClick={onClick}
                    onFocus={onFocus}
                    onKeyDown={onKeyDown}
                    ref={ref}
                    data-cy="item-entity-card"
                >
                    <CardBody>
                        <CardMedia base="div" src={url} ratio="1 / 1" data-cy="item-entity-card-media" />
                        <StyledCardBadge view="secondary" size="l" text={`${order}`} />
                    </CardBody>
                </Card>
                <StyledFootnote1>{title}</StyledFootnote1>
            </StyledCol>
        );
    },
);
