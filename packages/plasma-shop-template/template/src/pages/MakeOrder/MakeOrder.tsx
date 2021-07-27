import React from 'react';
import styled from 'styled-components';
import { ConfirmOrderPage, useAssistantOnSmartAppData, useCart } from '@sberdevices/plasma-temple';
import { Spinner } from '@sberdevices/plasma-ui';

import { ActionType, Address, AssistantDataAction, PageComponentProps } from '../../types';
import { formatPhone, normalizePhone } from '../../utils/formatPhone';
import { useAssistantState } from '../../hooks/useAssistantState';

import { RecipientInfoContext } from './RecipientInfoContext';
import { usePayment } from './hooks/usePayment';

const delivery = {
    details: 'До двери',
    amount: 500,
};

const formatValue = (value?: string, prefix = '') => {
    if (value) {
        return `${prefix} ${value}`;
    }
};

const joinValues = (values: (string | undefined)[]) => values.filter((value) => value).join(', ');

const formatAddress = ({ city, street, house, flat, entrance, floor }: Address) => {
    const title = joinValues([formatValue(city), formatValue(street), formatValue(house)]);
    const content = joinValues([
        formatValue(flat, 'квартира'),
        formatValue(entrance, 'подъезд'),
        formatValue(floor, 'этаж'),
    ]);

    return {
        title,
        content,
    };
};

const StyledSpinner = styled(Spinner)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const MakeOrder: React.FC<PageComponentProps<'makeOrder'>> = (props) => {
    const { assistant, name, state, pushScreen, pushHistory } = props;

    const { recipient } = React.useContext(RecipientInfoContext);

    const { clearCart, price } = useCart();

    const {
        orderNumber,
        paymentProcessStatus,
        onPay,
        onPaymentError,
        onPaymentFinished,
        onPaymentConfirmed,
    } = usePayment({
        assistant,
    });

    const header = { ...props.header, children: null, title: 'Оформление заказа' };
    const paymentStopped = paymentProcessStatus === 'stopped' || paymentProcessStatus === 'error';

    const onChangeRecipient = React.useCallback(() => {
        if (paymentStopped) {
            pushScreen('recipient');
        }
    }, [paymentStopped, pushScreen]);

    useAssistantState({
        screen: name,
        order: state,
        recipientInfo: {
            recipient: {
                ...recipient,
                phone: normalizePhone(recipient.phone),
            },
        },
    });

    useAssistantOnSmartAppData<AssistantDataAction>(async (action) => {
        if (!action) {
            return;
        }

        switch (action.type) {
            case ActionType.START_PAYMENT:
                onPay();
                break;
            case ActionType.ERROR:
                onPaymentError();
                break;
            case ActionType.PAYMENT_FINISHED:
                onPaymentFinished(action.payload.invoiceId);
                break;
            case ActionType.PAYMENT_CONFIRMED: {
                await onPaymentConfirmed();
                pushHistory('orderSuccess', { orderNumber, amount: price });
                clearCart();
                break;
            }
            case ActionType.CHANGE_RECIPIENT:
                onChangeRecipient();
                break;
            default:
        }
    });

    const phone = recipient.phone ? formatPhone(recipient.phone) : '';

    if (paymentProcessStatus === 'finished') {
        return <StyledSpinner />;
    }

    return (
        <>
            <ConfirmOrderPage
                header={header}
                delivery={delivery}
                recipient={{ ...recipient, phone }}
                address={formatAddress(recipient.address)}
                amount={state.price}
                onPay={onPay}
                onChangeRecipient={onChangeRecipient}
                paymentDisabled={!paymentStopped}
            />
        </>
    );
};
