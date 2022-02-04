import React from 'react';
import styled from 'styled-components';
import { Button, Headline2, Image } from '@sberdevices/plasma-ui';

import { defaultButtonText, EmptyCartProps } from './EmptyCart@common';

const StyledWrapper = styled.div<{ bottom?: number }>`
    position: fixed;
    top: 0;
    bottom: 0;
    left: var(--plasma-grid-margin);
    right: var(--plasma-grid-margin);

    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;

    padding-bottom: ${({ bottom }) => bottom ?? 72}px;
`;

const StyledText = styled(Headline2)`
    margin-top: 0.5rem;
    flex: 1;
`;

export const EmptyCartMobile: React.FC<EmptyCartProps> = ({
    insets,
    imageSrc = '',
    buttonText = defaultButtonText,
    className,
    onGoToCatalog,
}) => {
    return (
        <StyledWrapper className={className} bottom={insets?.bottom}>
            <Image base="div" src={imageSrc} ratio="1 / 1" data-cy="EmptyCart-image" />
            <StyledText>В корзине пусто</StyledText>
            {onGoToCatalog && (
                <Button view="primary" onClick={onGoToCatalog} stretch data-cy="EmptyCart-button">
                    {buttonText}
                </Button>
            )}
        </StyledWrapper>
    );
};
