import React from 'react';
import styled from 'styled-components';
import { CarouselCol } from '@sberdevices/plasma-ui';

import { UnifiedComponentProps } from '../../../../registry/types';

export interface CatalogCellProps {
    onClick: React.MouseEventHandler<HTMLDivElement>;
    onFocus: React.FocusEventHandler<HTMLDivElement>;
    image: string;
}

export interface StoreCellProps {
    onClick: React.MouseEventHandler<HTMLDivElement>;
    onFocus: React.FocusEventHandler<HTMLDivElement>;
}

const StyledCol = styled(CarouselCol)`
    flex-direction: column;
    display: flex;
`;

export interface NavColProps {
    onFocus: React.FocusEventHandler<HTMLDivElement>;
    onCatalogOpen: () => void;
    onStoreInfoClick: () => void;
    catalogImage: string;
}

export const NavCol: React.FC<UnifiedComponentProps<NavColProps, 'CatalogCard' | 'StoreCard'>> = ({
    onFocus,
    onCatalogOpen,
    onStoreInfoClick,
    catalogImage,
    platformComponents,
}) => {
    const { CatalogCard, StoreCard } = platformComponents;

    return (
        <StyledCol sizeXL={3} sizeM={3} key="main-card" scrollSnapAlign="start">
            <CatalogCard onClick={onCatalogOpen} onFocus={onFocus} image={catalogImage} />
            <StoreCard onClick={onStoreInfoClick} onFocus={onFocus} />
        </StyledCol>
    );
};
