import React from 'react';
import { Cancelable, ThrottleSettings } from 'lodash';
import throttle from 'lodash.throttle';

type ThrottleFnArgs = Parameters<typeof throttle>;
type ThrottleFnType = ThrottleFnArgs[0];

export function useThrottledCallback<T extends ThrottleFnType>(
    fn: T,
    wait: number,
    dependencies: React.DependencyList,
    params?: ThrottleSettings,
): T & Cancelable {
    const throttled = throttle(fn, wait, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return React.useCallback<T & Cancelable>(throttled, dependencies);
}
