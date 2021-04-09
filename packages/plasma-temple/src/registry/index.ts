import { isSberPortal } from '@sberdevices/plasma-ui/utils';

import SberBoxRegistry from './registry@sberbox';
import SberPortalRegistry from './registry@sberportal';

export const getRegistry = () => {
    if (isSberPortal()) {
        return SberPortalRegistry;
    }

    return SberBoxRegistry;
};
