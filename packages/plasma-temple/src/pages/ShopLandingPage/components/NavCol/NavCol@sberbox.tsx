import React from 'react';
import styled from 'styled-components';
import { Card, CardBody, CardMedia, CardBody1, Cell, CardContent } from '@sberdevices/plasma-ui';

import { InfoIcon as Icon } from './InfoIcon';
import { NavCol as CommonNavCol, NavColProps, CatalogCellProps, StoreCellProps } from './NavCol';

const StyledCatalogCardContent = styled(CardContent)`
    background: transparent;
`;

const StyledCard = styled(Card)`
    margin-top: auto;
`;

const StyledStoreCardContent = styled(CardContent)`
    padding: 1.5rem 1rem;
`;

const InfoIcon = styled.span`
    display: block;
    position: absolute;
    height: 100%;
    width: 144px;
    top: 0;
    right: 0;
`;

const CatalogCell: React.FC<CatalogCellProps> = ({ onClick, focused, image }) => {
    return (
        <Card data-cy="main-card" onClick={onClick} focused={focused} tabIndex={-1}>
            <CardBody>
                <CardMedia data-cy="main-card-image-mock" src={image} base="div" ratio="1 / 1" />
                <StyledCatalogCardContent cover>
                    <CardBody1>Каталог</CardBody1>
                </StyledCatalogCardContent>
            </CardBody>
        </Card>
    );
};

export const StoreCell: React.FC<StoreCellProps> = ({ onClick, focused }) => (
    <StyledCard onClick={onClick} focused={focused} tabIndex={-1}>
        <CardBody>
            <StyledStoreCardContent>
                <Cell content={<CardBody1>О магазине</CardBody1>} />
                <InfoIcon>
                    <Icon />
                </InfoIcon>
            </StyledStoreCardContent>
        </CardBody>
    </StyledCard>
);

export const NavCol: React.FC<NavColProps> = (props) => {
    return (
        <CommonNavCol
            {...props}
            platformComponents={{
                CatalogCard: CatalogCell,
                StoreCard: StoreCell,
            }}
        />
    );
};
