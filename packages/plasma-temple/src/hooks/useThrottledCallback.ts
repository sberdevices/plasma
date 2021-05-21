import React from 'react';
import { Cancelable, ThrottleSettings } from 'lodash';
import throttle from 'lodash.throttle';

type ThrottleFnArgs = Parameters<typeof throttle>;
type ThrottleFnType = ThrottleFnArgs[0];

export const THROTTLE_WAIT = 450;
export const THROTTLE_PARAMS: ThrottleSettings = {
    leading: true,
    trailing: false,
};

export function useThrottledCallback<T extends ThrottleFnType>(
    fn: T,
    dependencies: React.DependencyList,
    wait = THROTTLE_WAIT,
    params = THROTTLE_PARAMS,
): T & Cancelable {
    const throttled = throttle(fn, wait, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return React.useCallback<T & Cancelable>(throttled, dependencies);
}
