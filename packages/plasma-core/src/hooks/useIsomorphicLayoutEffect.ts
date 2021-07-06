import { useLayoutEffect, useEffect } from 'react';

import { canUseDOM } from '../utils';

/**
 * Runs effect safely on server.
 */
export const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;
