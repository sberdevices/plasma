import React from 'react';

import { RecipientInfo } from '../../types';

interface RecipientInfoContextValue extends RecipientInfo {
    changeRecipientInfo: (recipient: Partial<RecipientInfo>) => void;
}

export const recipientInfoInitialValue: RecipientInfo = {
    /**
     * Пример заполненных данных пользователем о доставке и получателе заказа
     */
    recipient: {
        name: 'Иван',
        phone: '791023123412',
        email: 'qwe@qwe.ru',
        address: {
            city: 'Город',
            comment: 'Комментарий к доставке',
            entrance: '2',
            flat: '32',
            floor: '2',
            house: '1',
            street: 'ул Улица',
        },
    },
};

export const RecipientInfoContext = React.createContext<RecipientInfoContextValue>({
    ...recipientInfoInitialValue,
    changeRecipientInfo: () => {
        throw new Error('RecipientInfo context value is missing');
    },
});
