import { ExtendedSelector } from '../types';

export function matchSelector(element: HTMLElement, extSelector: ExtendedSelector): boolean {
    if (typeof extSelector === 'string') {
        return element.matches(extSelector);
    }

    if (Array.isArray(extSelector)) {
        return extSelector.includes(element);
    }

    if (extSelector instanceof NodeList) {
        for (const node of extSelector) {
            if (element === node) {
                return true;
            }
        }

        return false;
    }

    if (extSelector instanceof HTMLElement) {
        return element === extSelector;
    }

    return false;
}
