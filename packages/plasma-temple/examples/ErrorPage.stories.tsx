import React from 'react';
import { Button } from '@sberdevices/plasma-ui';

import { ErrorPage } from '../src/pages/ErrorPage/ErrorPage';

export default {
    title: 'Pages/ErrorPage',
};

export const Default: React.FC = () => (
    <ErrorPage
        header={{ title: 'Header Title' }}
        error={{ status: 'Something went wrong', message: 'Try again later' }}
        buttons={<Button view="primary" text="Primary Button" />}
    />
);

export const WithTwoButtons: React.FC = () => (
    <ErrorPage
        header={{ title: 'Header Title' }}
        error={{ status: 'Something went wrong', message: 'Try again later' }}
        buttons={(ref) => (
            <>
                <Button view="primary" ref={ref} text="Primary" />
                <Button view="secondary" text="Secondary" />
            </>
        )}
    />
);
