import React from 'react';
import { v4 as uuid } from 'uuid';
import { AssistantInstance } from '@sberdevices/plasma-temple';

import { ServerAction, ServerActionType } from '../../../types';

type PaymentProcessStatus = 'stopped' | 'started' | 'finished' | 'error' | 'confirmed';

interface UsePaymentProps {
    assistant: AssistantInstance | null;
}

export const usePayment = ({ assistant }: UsePaymentProps) => {
    const [paymentProcessStatus, setPaymentProcessStatus] = React.useState<PaymentProcessStatus>('stopped');
    const [orderNumber] = React.useState(uuid());
    const [invoiceId, setInvoiceId] = React.useState('');

    const onPay = React.useCallback(async () => {
        setPaymentProcessStatus('started');

        assistant?.sendAction<ServerAction>({
            type: ServerActionType.PAY,
            payload: { orderNumber },
        });
    }, [assistant, orderNumber]);

    const onPaymentError = React.useCallback(() => {
        setPaymentProcessStatus('error');
    }, []);

    const onPaymentFinished = React.useCallback(
        (orderInvoiceId: string) => {
            setPaymentProcessStatus('finished');
            setInvoiceId(orderInvoiceId);
            assistant?.sendAction<ServerAction>({
                type: ServerActionType.CHECK_PAYMENT_STATUS,
                payload: { invoiceId: orderInvoiceId },
            });
        },
        [assistant],
    );

    const onPaymentConfirmed = React.useCallback(async () => {
        setPaymentProcessStatus('confirmed');
    }, []);

    React.useEffect(() => {
        let timer = 0;

        if (paymentProcessStatus !== 'finished') {
            clearInterval(timer);
            return;
        }
        // После завершения оплаты делаем запросы на проверку статуса платежа
        timer = window.setInterval(
            () =>
                assistant?.sendAction<ServerAction>({
                    type: ServerActionType.CHECK_PAYMENT_STATUS,
                    payload: { invoiceId },
                }),
            2000,
        );

        return () => {
            clearInterval(timer);
        };
    }, [assistant, invoiceId, paymentProcessStatus]);

    return {
        orderNumber,
        paymentProcessStatus,
        onPay,
        onPaymentError,
        onPaymentFinished,
        onPaymentConfirmed,
    };
};
