import React from 'react';

import { DeviceComponent } from '../../DeviceComponent/DeviceComponent';

import { CartOrderProps } from './CartOrder@common';
import { CartOrderMobile } from './CartOrder@mobile';
import { CartOrderSberBox } from './CartOrder@sberbox';
import { CartOrderSberPortal } from './CartOrder@sberportal';

export type { CartOrderProps };

export const CartOrder = React.memo((props) => (
    <DeviceComponent
        sberbox={CartOrderSberBox}
        sberportal={CartOrderSberPortal}
        mobile={CartOrderMobile}
        props={props}
    />
)) as typeof CartOrderSberBox;
