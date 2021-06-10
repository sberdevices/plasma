import React from 'react';
import styled from 'styled-components';
import { Card, CardBody, CardBody1, CardMedia, Cell, CardContent } from '@sberdevices/plasma-ui';

import Icon from '../../assets/info.svg';

import { NavCol as CommonNavCol, NavColProps, CatalogCellProps, StoreCellProps } from './NavCol';

const StyledCard = styled(Card).attrs({
    'data-cy': 'main-card',
})`
    height: 232px;

    & + & {
        margin-top: auto;
    }
`;

const StyledCardContent = styled(CardContent)`
    position: absolute;
    top: 0;
    left: 0;
    padding: 1.5rem 1rem;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    background: transparent;
`;

const InfoIcon = styled.img`
    display: block;
    position: absolute;
    height: 100%;
    width: 236px;
    top: 0;
    right: 0;
`;

const CatalogCell: React.FC<CatalogCellProps> = ({ onClick, image }) => {
    return (
        <StyledCard onClick={onClick}>
            <CardBody>
                <CardMedia data-cy="main-card-image-mock" src={image} base="div" ratio="1 / 1" />
                <StyledCardContent>
                    <CardBody1>Каталог</CardBody1>
                </StyledCardContent>
            </CardBody>
        </StyledCard>
    );
};

export const StoreCell: React.FC<StoreCellProps> = ({ onClick }) => (
    <StyledCard data-cy="main-card" onClick={onClick}>
        <CardBody>
            <StyledCardContent>
                <Cell content={<CardBody1>О магазине</CardBody1>} />
                <InfoIcon src={Icon} />
            </StyledCardContent>
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
