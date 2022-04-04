import React from 'react';
import styled, { css } from 'styled-components';
import { Body1, Body2, Button, Col, Footnote1, Headline3, Price, Row } from '@sberdevices/plasma-ui';
import { secondary } from '@sberdevices/plasma-tokens';
import { detectDevice, mediaQuery } from '@sberdevices/plasma-ui/utils';

import { Header } from '../../components/Header/Header';
import { ComponentPropsWithHeader } from '../../components/Header/types';
import { DeviceFamily } from '../../types';
import { useFocusOnMount } from '../../hooks/useFocusOnMount';
import { THROTTLE_WAIT, useThrottledCallback } from '../../hooks/useThrottledCallback';
import { isSberBoxLike } from '../../utils/deviceFamily';

import { ConfirmOrderCard } from './components/ConfirmOrderCard/ConfirmOrderCard';
import { LocationIcon } from './ConfirmOrderPage.assets/LocationIcon';

export interface ConfirmOrderProps extends ComponentPropsWithHeader {
    delivery: {
        details: string;
        amount: number;
    };
    recipient: {
        name: string;
        phone: string;
        email?: string;
    };
    address: {
        title: string;
        content: string;
    };
    amount: number;
    background?: string;
    paymentDisabled?: boolean;
    onPay: () => void;
    onChangeRecipient: () => void;
    onChangeDelivery?: () => void;
}

const StyledLocationCol = styled(Col)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    text-align: center;
`;

const StyledBackground = styled.div<{ background?: string }>`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    height: 100vh;

    ${({ background }) =>
        background &&
        css`
            z-index: -1;
            mask-image: linear-gradient(90.09deg, rgba(8, 8, 8, 0) 42.41%, rgb(8, 8, 8) 99.93%);
            background: url(${background}) no-repeat;
            background-size: cover;
        `}
`;

const mapDeviceToAddressTitle: Record<DeviceFamily, React.FC> = {
    sberBox: Headline3,
    sberPortal: Body2,
    mobile: Body2,
};

const AddressTitle = mapDeviceToAddressTitle[detectDevice()];

const StyledAddressTitle = styled(AddressTitle)`
    margin: 0.625rem 0;
`;

const mapDeviceToAddressContent: Record<DeviceFamily, React.FC> = {
    sberBox: Body1,
    sberPortal: Footnote1,
    mobile: Footnote1,
};

const AddressContent = mapDeviceToAddressContent[detectDevice()];

const StyledAddressContent = styled(AddressContent)`
    color: ${secondary};
`;

const StyledPhone = styled(AddressTitle)`
    margin-top: 1.25rem;
`;

const StyledButton = styled(Button)`
    margin-top: 1.5rem;

    ${mediaQuery(
        'M',
        2,
    )(
        css`
            margin-top: 1.25rem;
        `,
    )}
`;

const defaultHeader = {
    title: 'Оформление заказа',
};

export const ConfirmOrderPage: React.FC<ConfirmOrderProps> = ({
    delivery,
    recipient,
    address,
    amount,
    paymentDisabled,
    onPay,
    onChangeRecipient,
    onChangeDelivery,
    header = defaultHeader,
    background,
}) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    useFocusOnMount<HTMLButtonElement>(buttonRef, {
        delay: THROTTLE_WAIT,
        prevent: !isSberBoxLike(),
    });

    const handlePay = useThrottledCallback(() => onPay(), [onPay]);

    return (
        <>
            <StyledBackground background={background} />
            <Header {...header} />
            <Row>
                <Col sizeXL={5.5} sizeM={3}>
                    <ConfirmOrderCard
                        title="Доставка"
                        content={delivery.details}
                        price={delivery.amount}
                        onClick={onChangeDelivery}
                    />
                    <ConfirmOrderCard
                        title="Данные получателя"
                        content={recipient.name}
                        caption={recipient.email}
                        onClick={onChangeRecipient}
                    />
                    <StyledButton
                        ref={buttonRef}
                        stretch
                        view="primary"
                        text="К оплате"
                        data-cy="confirm-order-payment-button"
                        disabled={paymentDisabled}
                        contentRight={<Price>{amount}</Price>}
                        onClick={handlePay}
                    />
                </Col>
                <StyledLocationCol sizeXL={5.5} sizeM={3} offsetXL={1} data-cy="confirm-order-location">
                    <LocationIcon />
                    <StyledAddressTitle>{address.title}</StyledAddressTitle>
                    <StyledAddressContent>{address.content}</StyledAddressContent>
                    <StyledPhone>{recipient.phone}</StyledPhone>
                </StyledLocationCol>
            </Row>
        </>
    );
};
