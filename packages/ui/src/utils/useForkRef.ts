import React from 'react';

import { setRef } from './setRef';

export interface UseForkRefHook {
    <T>(refOne: React.Ref<T>, refTwo: React.Ref<T>): React.Ref<T>;
}

export const useForkRef: UseForkRefHook = (refOne, refTwo) => {
    return React.useMemo(() => {
        if (refOne == null && refTwo === null) {
            return null;
        }

        return (refOb) => {
            setRef(refOne, refOb);
            setRef(refTwo, refOb);
        };
    }, [refOne, refTwo]);
};
