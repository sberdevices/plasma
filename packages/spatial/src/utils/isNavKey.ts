import { NAV_KEYS } from '../utils/types';

function isNavKey(param: unknown): param is NAV_KEYS {
    return typeof param === 'string' && Object.values(NAV_KEYS).includes(param as NAV_KEYS);
}

export { isNavKey };

export default isNavKey;
