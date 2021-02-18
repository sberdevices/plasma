import React from 'react';

export interface SetRef {
    <T>(
        ref: React.MutableRefObject<T | null> | ((instance: T | null) => void) | null | undefined,
        value: T | null,
    ): void;
}

export const setRef: SetRef = (ref, value) => {
    if (typeof ref === 'function') {
        ref(value);
    } else if (ref) {
        ref.current = value;
    }
};
