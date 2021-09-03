import React from 'react';
import { OrderSuccessPage } from '@sberdevices/plasma-temple';

import { PageComponentProps } from '../../types';

export const OrderSuccess: React.FC<PageComponentProps<'orderSuccess'>> = ({ header, state, goToScreen }) => {
    return (
        <OrderSuccessPage
            header={{ ...header, title: `Заказ #${state.orderNumber} на сумму ${state.amount} ₽`, children: null }}
            onGoBack={() => goToScreen('main')}
            imageSrc="/images/cubic.png"
        />
    );
};
