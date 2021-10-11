import React from 'react';

export const useMount = (effect: React.EffectCallback): void => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(effect, []);
};
