import React, { Reducer } from 'react';
import { v4 as uuid } from 'uuid';
import { AssistantInstance } from '@sberdevices/plasma-temple';

import { ServerAction, ServerActionType } from '../../../types';

type PaymentProcessStatus = 'stopped' | 'started' | 'finished' | 'error' | 'confirmed';

interface UsePaymentProps {
    assistant: AssistantInstance | null;
}

type PaymentAction<T extends string, P = any> = P extends void
    ? { type: T }
    : {
          type: T;
          payload: P;
      };

type Action =
    | PaymentAction<PaymentProcessStatus>
    | PaymentAction<
          'set invioce id',
          {
              invoiceId: string;
          }
      >
    | PaymentAction<'set order number', string>;

type State = {
    paymentProcessStatus: PaymentProcessStatus;
    invoiceId: string;
    orderNumber: string;
};

const reducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
        case 'confirmed':
        case 'error':
        case 'finished':
        case 'started':
        case 'stopped':
            return {
                ...state,
                paymentProcessStatus: action.type,
            };
        case 'set invioce id':
            return {
                ...state,
                paymentProcessStatus: 'finished',
                invoiceId: action.payload.invoiceId,
            };
        case 'set order number':
            return {
                ...state,
                orderNumber: action.payload,
            };
        default:
            return state;
    }
};

export const usePayment = ({ assistant }: UsePaymentProps) => {
    const [{ paymentProcessStatus, orderNumber, invoiceId }, dispatch] = React.useReducer(reducer, {
        paymentProcessStatus: 'stopped',
        orderNumber: uuid(),
        invoiceId: '',
    });

    const onPay = React.useCallback(async () => {
        dispatch({
            type: 'started',
        });

        assistant?.sendAction<ServerAction>({
            type: ServerActionType.PAY,
            payload: { orderNumber },
        });
    }, [assistant, orderNumber]);

    const onPaymentError = React.useCallback(() => {
        dispatch({
            type: 'error',
        });
    }, []);

    React.useEffect(() => {
        if (invoiceId) {
            assistant?.sendAction<ServerAction>({
                type: ServerActionType.CHECK_PAYMENT_STATUS,
                payload: { invoiceId },
            });
        }
    }, [invoiceId]);

    const onPaymentFinished = React.useCallback((orderInvoiceId: string) => {
        dispatch({
            type: 'set invioce id',
            payload: {
                invoiceId: orderInvoiceId,
            },
        });
    }, []);

    const onPaymentConfirmed = React.useCallback(async () => {
        dispatch({
            type: 'confirmed',
        });
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
