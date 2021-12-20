import React from 'react';
import { DeviceFamily } from 'src/types';
import { deviceFamily } from 'src/utils/deviceFamily';

import { StateLayoutMobile } from './StateLayout@mobile';
import { StateLayoutSberBox } from './StateLayout@sberbox';
import { StateLayoutSberPortal } from './StateLayout@sberportal';
import { StateLayoutCommonProps } from './types';

export const mapDeviceToStateLayout: Record<DeviceFamily, React.FC<StateLayoutCommonProps>> = {
    sberBox: StateLayoutSberBox,
    sberPortal: StateLayoutSberPortal,
    mobile: StateLayoutMobile,
};

export const StateLayout = mapDeviceToStateLayout[deviceFamily];
