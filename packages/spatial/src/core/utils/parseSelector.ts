import { isHTMLElement } from './isHTMLElement';
import type { ExtendedSelector } from '../types';

export function parseSelector(extSelector: ExtendedSelector): HTMLElement[] {
    if (typeof extSelector === 'string') {
        return Array.from(document.querySelectorAll(extSelector));
    }

    if (Array.isArray(extSelector)) {
        return extSelector.filter(isHTMLElement);
    }

    if (extSelector instanceof NodeList) {
        return Array.from(extSelector).filter(isHTMLElement);
    }

    if (isHTMLElement(extSelector)) {
        return [extSelector];
    }

    return [];
}
