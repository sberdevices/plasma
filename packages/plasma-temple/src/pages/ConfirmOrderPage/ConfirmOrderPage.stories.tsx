import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@sberdevices/plasma-ui';
import { IconEdit } from '@sberdevices/plasma-icons';

import { ConfirmOrderPage } from './ConfirmOrderPage';

export default {
    title: 'Pages/Confirm Order',
};

const delivery = {
    details: 'До двери, СДЭК',
    amount: 500,
};

const recipient = {
    name: 'Константин Константинов',
    phone: '+7 910 345-87-67',
    email: 'Kostyan3000@gmail.com',
};
const address = {
    title: 'Кутузовский проспект, 32',
    content: 'Квартира 48, подъезд 1, этаж 6, домофон 48',
};

export const Default = (): React.ReactElement => {
    return (
        <ConfirmOrderPage
            delivery={delivery}
            recipient={recipient}
            address={address}
            amount={10456}
            onPay={action('onPay')}
            onChangeRecipient={action('onChangeRecipient')}
            onChangeDelivery={action('onChangeDelivery')}
            header={{
                title: 'Оформление заказа',
                children: (
                    <Button
                        text="Изменить адрес"
                        view="clear"
                        contentLeft={<IconEdit />}
                        onClick={action('onChangeAddress')}
                    />
                ),
            }}
        />
    );
};
