import React from 'react';

import { DeviceFamily } from '../../types';
import { deviceFamily } from '../../utils/deviceFamily';

import { AssistantSuggestProps, AssistantSuggestSberBox } from './AssistantSuggest@sbebox';
import { AssistantSuggestSberPortal } from './AssistantSuggest@sbeportal';

const mapDeviceToCartOrder: Record<DeviceFamily, React.FC<AssistantSuggestProps>> = {
    sberBox: AssistantSuggestSberBox,
    sberPortal: AssistantSuggestSberPortal,
    mobile: AssistantSuggestSberPortal,
};

export const AssistantSuggest = mapDeviceToCartOrder[deviceFamily];
