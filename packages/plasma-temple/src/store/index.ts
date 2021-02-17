import { AssistantAction } from '../types';

import { AppStateAction } from './reducer';

export const store = {
    isReady: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dispatch(_action: AppStateAction | AssistantAction): void {
        if (!this.isReady) {
            throw new ReferenceError('Store is NOT ready');
        }
    },
};
