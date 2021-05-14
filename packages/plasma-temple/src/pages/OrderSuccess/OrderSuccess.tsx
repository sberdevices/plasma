import React from 'react';
import styled, { css } from 'styled-components';
import { Button, Col, Headline1, Headline2, Row, Image } from '@sberdevices/plasma-ui';
import { HeaderProps } from '@sberdevices/plasma-ui/components/Header/Header';
import { detectDevice, mediaQuery } from '@sberdevices/plasma-ui/utils';

import { Header } from '../../components/Header/Header';
import { DeviceFamily } from '../../types';

interface OrderSuccessProps {
    header?: HeaderProps;
    imageSrc?: string;
    onGoBack: () => void;
}

const mapDeviceToHeadline: Record<DeviceFamily, React.FC> = {
    sberBox: Headline1,
    sberPortal: Headline2,
    mobile: Headline2,
};

const StyledHeadline = styled(mapDeviceToHeadline[detectDevice()])`
    margin-top: 1.9rem;
    margin-bottom: 2rem;
`;

const StyledImageContainer = styled.div`
    margin-left: auto;
    width: 656px;

    ${mediaQuery(
        'M',
        2,
    )(
        css`
            width: 408px;
        `,
    )}
`;

export const OrderSuccess: React.FC<OrderSuccessProps> = ({ header, imageSrc = '', onGoBack }) => {
    return (
        <>
            {header && <Header {...header} />}
            <Row>
                <Col sizeXL={6} sizeM={3}>
                    <StyledHeadline>Заказ успешно оформлен! Статус заказа будет отправлен на E-mail</StyledHeadline>
                    <Button view="primary" onClick={onGoBack}>
                        Вернуться в магазин
                    </Button>
                </Col>
                {imageSrc && (
                    <Col sizeXL={6} sizeM={3}>
                        <StyledImageContainer>
                            <Image base="div" src={imageSrc} ratio="1 / 1" />
                        </StyledImageContainer>
                    </Col>
                )}
            </Row>
        </>
    );
};