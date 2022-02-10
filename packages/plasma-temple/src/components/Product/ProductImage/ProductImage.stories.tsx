import React from 'react';
import { Col, Row } from '@sberdevices/plasma-ui';

import { ProductImage } from './ProductImage';

export default {
    title: 'Product/Image',
};

const Container: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
    <Row>
        <Col sizeXL={5} sizeM={2} sizeS={4}>
            {children}
        </Col>
    </Row>
);

export const Default = (): React.ReactElement => {
    return (
        <Container>
            <ProductImage src="images/img.png" />
        </Container>
    );
};
