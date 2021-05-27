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

const imageSrc =
    'https://s3-alpha-sig.figma.com/img/e31a/3985/e296c0fe873f8d9dcb30b16f665c9f08?Expires=1621814400&Signature=M28Ip1JSifr8TulGdTZUEGaO3s561CdHYlheE5y26tcCNoRsc~b5zoqwrwMEewte8UF8HH-c~BCkM7~WNQHlPQkTlG-b3Mc9lTz6xeEFQlZz7kN0ByX2vi6ENS1UiSS0-1uAAW0uBZCBCODkW~0S50loW8MUjzK3PTHCZFPpt3ZxFR3W44un8uiI3BM0FzL2KKOFeal4RVUASQTsJ3371PEiWztYgd~s5Um4E20LEVCSfwMCLEYTqkQD1XtDyM~v0ByShfBTWSJkfPJH~cjUhK8hRbYjo8JnV2TfcfHnoqm6OXBs6ErWE9Nb-nq5mHKpgKq7SiMTU-o-uhaLr0xK6g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA';

export const Default = (): React.ReactElement => {
    return <OrderSuccessPage header={header} imageSrc={imageSrc} onGoBack={action('onGoBack')} />;
};
