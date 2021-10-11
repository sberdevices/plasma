import React from 'react';
import styled, { css } from 'styled-components';
import { CarouselItem } from '@sberdevices/plasma-ui';
import { mediaQuery } from '@sberdevices/plasma-ui/utils';

import { UnifiedComponentProps } from '../../../../registry/types';
import { useRemoteHandlers, useRemoteListener } from '../../../../hooks';

export interface CatalogCellProps {
    onClick: React.MouseEventHandler<HTMLDivElement>;
    image: string;
    focused: boolean;
}

export interface StoreCellProps {
    onClick: React.MouseEventHandler<HTMLDivElement>;
    focused: boolean;
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
    focused: boolean;
    onCatalogOpen: () => void;
    onStoreInfoClick: () => void;
    catalogImage: string;
}

type PlatformComponents = {
    CatalogCard: CatalogCellProps;
    StoreCard: StoreCellProps;
};

export const NavCol: React.FC<UnifiedComponentProps<NavColProps, PlatformComponents>> = ({
    onCatalogOpen,
    onStoreInfoClick,
    catalogImage,
    platformComponents,
    focused,
}) => {
    const { CatalogCard, StoreCard } = platformComponents;

    const [activeIndex] = useRemoteHandlers({
        axis: 'y',
        initialIndex: 0,
        disable: !focused,
        repeat: false,
        min: 0,
        max: 1,
    });

    useRemoteListener(
        (key) => {
            if (key === 'OK' && focused) {
                if (activeIndex) {
                    onStoreInfoClick();
                } else {
                    onCatalogOpen();
                }
            }
        },
        { disable: !focused },
    );

    return (
        <StyledCarouselItem key="main-card" scrollSnapAlign="start">
            <CatalogCard onClick={onCatalogOpen} image={catalogImage} focused={focused && activeIndex === 0} />
            <StoreCard onClick={onStoreInfoClick} focused={focused && activeIndex === 1} />
        </StyledCarouselItem>
    );
};
