import React from 'react';
import styled from 'styled-components';
import { Col, Footnote1, Footnote2, Row } from '@sberdevices/plasma-ui';
import { secondary } from '@sberdevices/plasma-tokens';

import { ProductDescriptionProps } from './types';

const StyledDescriptionItem = styled.div`
    margin-bottom: 1rem;
`;

const StyledContent = styled(Footnote1)`
    color: ${secondary};
`;

const ColumnProductDescription: React.FC<Pick<ProductDescriptionProps, 'items'>> = ({ items }) => (
    <Col>
        {items.map(({ title, content }) => (
            <StyledDescriptionItem key={title}>
                <Footnote2>{title}</Footnote2>
                <StyledContent>{content}</StyledContent>
            </StyledDescriptionItem>
        ))}
    </Col>
);

const RowProductDescription: React.FC<Pick<ProductDescriptionProps, 'items'>> = ({ items }) => (
    <>
        {items.map(({ title, content }) => (
            <Col key={title}>
                <Footnote2>{content}</Footnote2>
                <StyledContent>{title}</StyledContent>
            </Col>
        ))}
    </>
);

export const ProductDescriptionSberPortal: React.FC<ProductDescriptionProps> = ({ layout, className, items }) => {
    return (
        <Row className={className}>
            {layout === 'column' ? <ColumnProductDescription items={items} /> : <RowProductDescription items={items} />}
        </Row>
    );
};
