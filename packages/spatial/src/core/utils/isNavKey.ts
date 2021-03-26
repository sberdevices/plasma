import { NavigationKeyCodes } from '../types';

const navigationKeyCodes: readonly NavigationKeyCodes[] = ['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp'];

export function isNavKey(keyCode: unknown): keyCode is NavigationKeyCodes {
    return typeof keyCode === 'string' && navigationKeyCodes.includes(keyCode as NavigationKeyCodes);
}
