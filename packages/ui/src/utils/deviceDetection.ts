export const deviceScales = {
    sberPortal: 2,
    sberBox: 2,
    touch: 1,
};

export type DeviceKind = keyof typeof deviceScales;

/**
 * Проверка в браузере на устройство "SberPortal".
 * @return {boolean}
 */
export const isSberPortal = (): boolean => {
    if (typeof navigator === 'undefined') {
        return false;
    }

    const ua = navigator.userAgent.toLowerCase();

    return ua.includes('sberportal') || ua.includes('stargate');
};

/**
 * Проверка в браузере на устройство "SberBox".
 * @return {boolean}
 */
export const isSberBox = (): boolean => {
    if (typeof navigator === 'undefined') {
        return false;
    }

    const ua = navigator.userAgent.toLowerCase();

    return ua.includes('sberbox');
};

/**
 * Проверка в браузере на устройство "SberBoxTV".
 * @return {boolean}
 */
export const isTV = (): boolean => {
    if (typeof navigator === 'undefined') {
        return false;
    }

    const ua = navigator.userAgent.toLowerCase();

    return ua.includes('(tv; tv)');
};

/**
 * Вернет тип устройства, под которым запустилось приложение.
 * В случае запуска в серверном окружении, возвращает "sberBox".
 * @return {DeviceKind}
 */
export const detectDevice = (): DeviceKind => {
    if (typeof navigator === 'undefined') {
        return 'sberBox';
    }
    switch (true) {
        case isSberPortal():
            return 'sberPortal';
        case isSberBox():
        case isTV():
            return 'sberBox';
        default:
            return 'touch';
    }
};
