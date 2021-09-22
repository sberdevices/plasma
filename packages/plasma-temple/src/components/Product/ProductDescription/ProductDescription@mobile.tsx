import React from 'react';
import styled, { css } from 'styled-components';
import { Footnote1, Footnote2 } from '@sberdevices/plasma-ui';
import { secondary } from '@sberdevices/plasma-tokens';

import { ProductDescriptionProps } from './types';

const applyEllipsis = css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const StyledDescriptionItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 0.75rem;
`;

const StyledTitle = styled(Footnote1)`
    ${applyEllipsis}
    color: ${secondary};
    max-width: 70%;

    &::first-letter {
        text-transform: uppercase;
    }
`;

const StyledSpace = styled.div`
    flex: 1;
    border: 0.5px dashed rgba(255, 255, 255, 0.56);
    height: 0;
    margin: 0 4px 4px;
    min-width: 1rem;
`;

const StyledContent = styled(Footnote2)`
    ${applyEllipsis}
    max-width: 70%;
`;

export const ProductDescriptionMobile: React.FC<ProductDescriptionProps> = ({ className, items }) => {
    return (
        <div className={className}>
            {items.map(({ title, content }) => (
                <StyledDescriptionItem key={title}>
                    <StyledTitle>{title}</StyledTitle>
                    <StyledSpace />
                    <StyledContent>{content}</StyledContent>
                </StyledDescriptionItem>
            ))}
        </div>
    );
};
