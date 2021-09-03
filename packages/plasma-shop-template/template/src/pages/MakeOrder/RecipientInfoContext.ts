import React from 'react';

import { RecipientInfo } from '../../types';

interface RecipientInfoContextValue extends RecipientInfo {
    changeRecipientInfo: (recipient: Partial<RecipientInfo>) => void;
}

export const recipientInfoInitialValue: RecipientInfo = {
    recipient: {
        name: '',
        phone: '',
        email: '',
        address: {
            city: '',
            street: '',
            house: '',
            flat: '',
        },
    },
};

export const RecipientInfoContext = React.createContext<RecipientInfoContextValue>({
    ...recipientInfoInitialValue,
    changeRecipientInfo: () => {
        throw new Error('RecipientInfo context value is missing');
    },
});
