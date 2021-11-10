import React from 'react';

import { setRef } from '../utils';

export interface UseForkRefHook {
    <T>(refOne: React.Ref<T>, refTwo: React.Ref<T>): React.Ref<T>;
}

/**
 * Позволяет переиспользовать объект `ref` внутри forwardRef.
 * @param {React.Ref<T>} refOne
 * @param {React.Ref<T>} refTwo
 * @return {Function React.Ref}
 */
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
