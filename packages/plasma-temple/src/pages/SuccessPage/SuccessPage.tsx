import React from 'react';

import { DeviceComponent } from '../../components/DeviceComponent/DeviceComponent';

import { SuccessPageProps } from './SuccessPage@common';
import { SuccessPageMobile } from './SuccessPage@mobile';
import { SuccessPageSberBox } from './SuccessPage@sberbox';
import { SuccessPageSberPortal } from './SuccessPage@sberportal';

export type { SuccessPageProps };

export const SuccessPage: React.FC<SuccessPageProps> = (props) => (
    <DeviceComponent
        sberbox={SuccessPageSberBox}
        sberportal={SuccessPageSberPortal}
        mobile={SuccessPageMobile}
        props={props}
    />
);
