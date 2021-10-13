import React from 'react';
import styled from 'styled-components';
import { Button, Headline2, Image } from '@sberdevices/plasma-ui';

import { defaultButtonText, defaultTitleText, EmptyCartProps } from './EmptyCart@common';

const StyledWrapper = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
`;

const StyledText = styled(Headline2)`
    margin-top: 0.5rem;
    flex: 1;
`;

export const EmptyCartMobile: React.FC<EmptyCartProps> = ({
    hasImage = true,
    imageSrc = '',
    imageHasRatio = true,
    imageRatio = '1 / 1',
    buttonText = defaultButtonText,
    titleText = defaultTitleText,
    className,
    onGoToCatalog,
}) => {
    return (
        <StyledWrapper className={className}>
            {hasImage && <Image base="div" src={imageSrc} ratio={imageHasRatio ? imageRatio : undefined} />}
            <StyledText>{titleText}</StyledText>
            {onGoToCatalog && (
                <Button view="primary" onClick={onGoToCatalog} stretch>
                    {buttonText}
                </Button>
            )}
        </StyledWrapper>
    );
};
