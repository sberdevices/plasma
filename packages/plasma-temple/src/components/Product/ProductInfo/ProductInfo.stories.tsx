import React from 'react';
import { Col, Row } from '@sberdevices/plasma-ui';

import { ProductInfo } from './ProductInfo';

export default {
    title: 'Product/Info',
};

const Container: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
    <Row>
        <Col sizeXL={7} sizeM={4} sizeS={4}>
            {children}
        </Col>
    </Row>
);

export const Default = (): React.ReactElement => {
    return (
        <Container>
            <ProductInfo
                title="Описание"
                info="Gan делают круто, это уже аксиома. Первый кубик Рубика со сменными магнитами долго ждали, было интересно, как удастся сделать это. Ган сделали все максимально грамотно, и хоть Gan 356 X Numerical IPG 3x3x3 стоит немало, тому есть объяснение.
Но перед тем, как обсуждать комплектацию и кручение, стоит разобраться в названии. Numerical IPG означает, что здесь используется новая, отличная от Gan 354 M, крестовина. К ней подходят другие гайки, которые можно закрутить даже пальцами. При этом система отдаленно напоминает систему регулировки как в GTS 3M.
А вот теперь время поговорить о комплектации, ведь она поражает. Самое главное – вы получаете упаковку сменных магнитов и гаек. Не забывайте, в кубе тоже установлены магниты и гайки, это четвертая вариация. Также Gan положили пластиковый бокс, визитку и инструкцию."
            />
        </Container>
    );
};
