import React from 'react';
import { detectDevice, DeviceKind } from '@sberdevices/plasma-ui/utils';

import { ExpandableProductDetailsCommon, ExpandableProductDetailsProps } from './ExpandableProductDetails@common';
import { ExpandableProductDetailsMobile } from './ExpandableProductDetails@mobile';

const mapDeviceToExpandableProductDetails: Record<DeviceKind, React.FC<ExpandableProductDetailsProps>> = {
    sberBox: ExpandableProductDetailsCommon,
    sberPortal: ExpandableProductDetailsCommon,
    mobile: ExpandableProductDetailsMobile,
};

export const ExpandableProductDetails = mapDeviceToExpandableProductDetails[detectDevice()];
