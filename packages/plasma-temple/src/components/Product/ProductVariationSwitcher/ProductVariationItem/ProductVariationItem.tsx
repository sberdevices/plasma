import React from 'react';
import styled, { css } from 'styled-components';
import { Button, mediaQuery } from '@sberdevices/plasma-ui';

const StyledButton = styled(Button)`
    border-radius: 6.25rem;
    height: 2.25rem;
    white-space: nowrap;

    ${mediaQuery(
        'L',
        2,
    )(css`
        margin-right: 0.75rem;
    `)}
`;

interface ProductVariationItemProps {
    index: number;
    active: boolean;
    variation: React.ReactNode;
    onFocus: (index: number) => void;
    onClick: (index: number) => void;
}

export const ProductVariationItem: React.FC<ProductVariationItemProps> = ({
    index,
    active,
    variation,
    onFocus,
    onClick,
}) => {
    const handleClick = React.useCallback(() => {
        onClick(index);
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
        <StyledButton
            data-index={index}
            view={active ? 'checked' : 'secondary'}
            scaleOnInteraction={false}
            scaleOnPress
            onFocus={handleFocus}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            data-cy="ProductVariationItem-button"
        >
            {variation}
        </StyledButton>
    );
};
