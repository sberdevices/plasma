import React from 'react';
import styled from 'styled-components';
import { Col, ParagraphText1, ParagraphText2, Row, TextBox } from '@sberdevices/plasma-ui';
import { secondary } from '@sberdevices/plasma-tokens';

import { ProductDescriptionProps } from './types';

const StyledDescriptionItem = styled.div`
    margin-bottom: 1rem;
`;

const StyledContent = styled(ParagraphText1)`
    color: ${secondary};
`;

const ColumnProductDescription: React.FC<Pick<ProductDescriptionProps, 'items'>> = ({ items }) => (
    <Col>
        {items.map(({ title, content }) => (
            <StyledDescriptionItem key={title}>
                <ParagraphText2>{title}</ParagraphText2>
                <StyledContent>{content}</StyledContent>
            </StyledDescriptionItem>
        ))}
    </Col>
);

const RowProductDescription: React.FC<Pick<ProductDescriptionProps, 'items'>> = ({ items }) => (
    <>
        {items.map(({ title, content }) => (
            <Col key={title}>
                <TextBox size="m" title={content} subTitle={title} />
            </Col>
        ))}
    </>
);

export const ProductDescriptionSberBox: React.FC<ProductDescriptionProps> = ({ layout, className, items }) => {
    return (
        <Row className={className}>
            {layout === 'column' ? <ColumnProductDescription items={items} /> : <RowProductDescription items={items} />}
        </Row>
    );
};
