import React from 'react';
import styled from 'styled-components';

export interface ProductImageProps {
    src?: string;
    defaultSrc?: string;
    className?: string;
}

const StyledImageContainer = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    border-radius: 1rem;
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 1rem;
`;

export function ProductImage({ src = '', defaultSrc = '', className }: ProductImageProps) {
    const [isDefault, setDefault] = React.useState(!src);

    const imageSrc = isDefault ? defaultSrc : src;

    return (
        <StyledImageContainer className={className} data-cy="ProductImage">
            {imageSrc && <StyledImage src={imageSrc} onError={() => setDefault(true)} />}
        </StyledImageContainer>
    );
}
