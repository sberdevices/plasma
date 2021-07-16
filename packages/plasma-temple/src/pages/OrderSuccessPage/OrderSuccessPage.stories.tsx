import React from 'react';
import { action } from '@storybook/addon-actions';
import { HeaderProps } from '@sberdevices/plasma-ui/components/Header/Header';

import { OrderSuccessPage } from './OrderSuccessPage';

export default {
    title: 'Pages/Order Success',
};

const header: HeaderProps = {
    title: 'Заказ  #4657 на 300 ₽',
    subtitle: '20.04 апреля 12:08',
};

const imageSrc = './images/cubic.png';

export const Default = (): React.ReactElement => {
    return <OrderSuccessPage header={header} imageSrc={imageSrc} onGoBack={action('onGoBack')} />;
};
