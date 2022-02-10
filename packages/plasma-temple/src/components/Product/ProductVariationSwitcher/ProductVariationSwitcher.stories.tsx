import React from 'react';
import { Col, Row } from '@sberdevices/plasma-ui';

import { ProductVariationSwitcher } from './ProductVariationSwitcher';

export default {
    title: 'Product/Variation switcher',
};

export const Default = (): React.ReactElement => {
    const [activeIndex, setActiveIndex] = React.useState(0);

    return (
        <>
            <Row>
                <Col sizeXL={7} sizeM={4} sizeS={4}>
                    <ProductVariationSwitcher
                        title="Цвет"
                        variations={['Цветной пластик', 'Черный', 'Белый', 'Голубой', 'Зелёный']}
                        activeIndex={activeIndex}
                        onChange={setActiveIndex}
                    />
                </Col>
            </Row>
        </>
    );
};
