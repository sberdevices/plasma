import React from 'react';

import { DeviceComponent } from '../../components/DeviceComponent/DeviceComponent';

import { ErrorPageProps } from './ErrorPage@common';
import { ErrorPageMobile } from './ErrorPage@mobile';
import { ErrorPageSberBox } from './ErrorPage@sberbox';
import { ErrorPageSberPortal } from './ErrorPage@sberportal';

export type { ErrorPageProps };

export const ErrorPage: React.FC<ErrorPageProps> = (props) => (
    <DeviceComponent
        sberbox={ErrorPageSberBox}
        sberportal={ErrorPageSberPortal}
        mobile={ErrorPageMobile}
        props={props}
    />
);
