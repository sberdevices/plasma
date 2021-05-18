import React from 'react';

export const useGetMutableValue = <T extends unknown>(value: T): (() => T) => {
    const stateRef = React.useRef(value);
    stateRef.current = value;
    return React.useCallback(() => stateRef.current, []);
};
