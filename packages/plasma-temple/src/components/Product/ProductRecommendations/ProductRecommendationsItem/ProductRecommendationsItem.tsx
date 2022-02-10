import React from 'react';
import styled, { css } from 'styled-components';
import {
    Body1,
    Body2,
    Card,
    CardBody,
    CardContent,
    CardMedia,
    DeviceKind,
    Footnote1,
    mediaQuery,
    Price,
} from '@sberdevices/plasma-ui';
import { primary, secondary } from '@sberdevices/plasma-tokens';

import { ProductEntity } from '../../types';
import { deviceFamily } from '../../../../utils/deviceFamily';

interface ProductRecommendationsItemProps {
    index: number;
    recommendation: ProductEntity;
    defaultImage?: string;
    onFocus: (index: number) => void;
    onClick: (recommendation: ProductEntity, index: number) => void;
}

const StyledCard = styled(Card)`
    height: 14.9rem;
    width: 12.25rem;

    ${mediaQuery(
        'M',
        2,
    )(css`
        height: 13.25rem;
        width: 10.375rem;
    `)}
    ${mediaQuery(
        'S',
        1,
    )(css`
        height: 13.25rem;
        width: 10.375rem;
    `)}
`;

const mapDeviceToName: Record<DeviceKind, React.FC> = {
    sberBox: Body1,
    sberPortal: Footnote1,
    mobile: Footnote1,
};

export const StyledName = styled(mapDeviceToName[deviceFamily])<{ lines: number }>`
    overflow: hidden;
    text-overflow: ellipsis;
    hyphens: none;

    ${({ lines }) =>
        lines > 1
            ? css`
                  display: -webkit-box;
                  -webkit-line-clamp: ${lines};
                  -webkit-box-orient: vertical;
              `
            : css`
                  white-space: nowrap;
              `}
`;

const StyledNameDetails = styled(mapDeviceToName[deviceFamily])`
    color: ${secondary};
`;

const mapDeviceToPrice: Record<DeviceKind, React.FC> = {
    sberBox: Body2,
    sberPortal: Footnote1,
    mobile: Footnote1,
};

const StyledPriceContainer = styled(mapDeviceToPrice[deviceFamily])`
    color: ${secondary};
    display: flex;
`;

const StyledPrice = styled(Price)`
    color: ${primary};
`;

const StyledOldPrice = styled(Price)`
    color: ${primary};
    opacity: 0.4;

    margin-left: 0.5rem;
`;

export const ProductRecommendationsItem: React.FC<ProductRecommendationsItemProps> = ({
    index,
    recommendation,
    defaultImage,
    onFocus,
    onClick,
}) => {
    const { name, nameDetails, images = [], price, oldPrice, currency } = recommendation;

    const handleClick = React.useCallback(() => {
        onClick(recommendation, index);
    }, [index, onClick]);

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent) => {
            if (event.key === 'Enter') {
                handleClick();
            }
        },
        [handleClick],
    );

    const handleFocus = React.useCallback(() => {
        onFocus(index);
    }, [index, onFocus]);

    return (
        <StyledCard onFocus={handleFocus} onClick={handleClick} onKeyDown={handleKeyDown} tabIndex={0} data-focusable>
            <CardBody>
                <CardMedia src={images[0]} placeholder={defaultImage} ratio="4 / 3" />
                <CardContent>
                    <StyledName lines={nameDetails ? 1 : 2}>{name}</StyledName>
                    {nameDetails && <StyledNameDetails>{nameDetails}</StyledNameDetails>}
                    <StyledPriceContainer>
                        {price && <StyledPrice currency={currency}>{price}</StyledPrice>}
                        {oldPrice && (
                            <StyledOldPrice stroke currency={currency}>
                                {oldPrice}
                            </StyledOldPrice>
                        )}
                    </StyledPriceContainer>
                </CardContent>
            </CardBody>
        </StyledCard>
    );
};
