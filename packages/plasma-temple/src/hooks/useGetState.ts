import React from 'react';

export const useGetState = <T extends unknown>(state: T): (() => T) => {
    const stateRef = React.useRef(state);
    stateRef.current = state;
    return React.useCallback(() => stateRef.current, []);
};
