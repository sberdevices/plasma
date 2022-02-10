import React from 'react';
import styled from 'styled-components';
import { Carousel, CarouselItem, detectDevice, DeviceKind, Footnote2, ParagraphText2 } from '@sberdevices/plasma-ui';

import { ProductVariationItem } from './ProductVariationItem/ProductVariationItem';

export interface ProductVariationSwitcherProps {
    title: React.ReactNode;
    variations: React.ReactNode[];
    activeIndex: number;
    className?: string;
    onChange: (index: number) => void;
}

const StyledContainer = styled.div`
    position: relative;
    width: 100%;
`;

const mapDeviceToTitle: Record<DeviceKind, React.FC> = {
    sberBox: ParagraphText2,
    sberPortal: Footnote2,
    mobile: Footnote2,
};

const StyledTitle = styled(mapDeviceToTitle[detectDevice()])`
    margin-bottom: 0.45rem;
`;

const StyledCarouselItem = styled(CarouselItem)`
    padding: 0.25rem;
`;

const StyledCarousel = styled(Carousel)`
    mask-image: linear-gradient(270deg, rgba(196, 196, 196, 0) 0%, #c4c4c4 25.92%);
`;

export const ProductVariationSwitcher = React.memo<ProductVariationSwitcherProps>(
    ({ title, variations, activeIndex, className, onChange }) => {
        const [carouselIndex, setCarouselIndex] = React.useState(activeIndex);

        const handleClick = React.useCallback((index: number) => {
            onChange(index);
            setCarouselIndex(index);
        }, []);

        return (
            <StyledContainer className={className}>
                <StyledTitle>{title}</StyledTitle>

                <StyledCarousel axis="x" index={carouselIndex} scrollAlign="start" paddingEnd="5rem">
                    {variations.map((variation, index) => (
                        <StyledCarouselItem scrollSnapAlign="start">
                            <ProductVariationItem
                                key={index}
                                index={index}
                                active={index === activeIndex}
                                variation={variation}
                                onClick={handleClick}
                                onFocus={setCarouselIndex}
                            />
                        </StyledCarouselItem>
                    ))}
                </StyledCarousel>
            </StyledContainer>
        );
    },
);
