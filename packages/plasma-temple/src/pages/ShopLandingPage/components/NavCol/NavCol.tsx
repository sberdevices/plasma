import React from 'react';
import styled, { css } from 'styled-components';
import { CarouselItem } from '@sberdevices/plasma-ui';
import { mediaQuery } from '@sberdevices/plasma-ui/utils';

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

const StyledCarouselItem = styled(CarouselItem)`
    flex-direction: column;
    display: flex;
    margin-right: 1rem;
    width: 392px;

    ${mediaQuery(
        'M',
        2,
    )(
        css`
            width: 512px;
        `,
    )}
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
        <StyledCarouselItem key="main-card" scrollSnapAlign="start">
            <CatalogCard onClick={onCatalogOpen} onFocus={onFocus} image={catalogImage} />
            <StoreCard onClick={onStoreInfoClick} onFocus={onFocus} />
        </StyledCarouselItem>
    );
};
