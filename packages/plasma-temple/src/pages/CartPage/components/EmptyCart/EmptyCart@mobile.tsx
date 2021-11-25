import React from 'react';
import styled from 'styled-components';
import { Button, Headline2, Image } from '@sberdevices/plasma-ui';

import { defaultButtonText, EmptyCartProps } from './EmptyCart@common';

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
    imageSrc = '',
    buttonText = defaultButtonText,
    className,
    onGoToCatalog,
}) => {
    return (
        <StyledWrapper className={className}>
            <Image base="div" src={imageSrc} ratio="1 / 1" />
            <StyledText>В корзине пусто</StyledText>
            {onGoToCatalog && (
                <Button view="primary" onClick={onGoToCatalog} stretch data-cy="EmptyCart-button">
                    {buttonText}
                </Button>
            )}
        </StyledWrapper>
    );
};
