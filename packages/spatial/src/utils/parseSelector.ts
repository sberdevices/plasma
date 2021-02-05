import { isHTMLElement } from '../utils/isHTMLElement';
import { ExtendedSelector } from '../utils/types';

function parseSelector(extSelector: ExtendedSelector): HTMLElement[] {
    if (typeof extSelector === 'string') {
        return Array.from(document.querySelectorAll(extSelector));
    }

    if (Array.isArray(extSelector)) {
        return Array.from(extSelector).filter(isHTMLElement);
    }

    if (isHTMLElement(extSelector)) {
        return [extSelector];
    }

    if (extSelector instanceof NodeList) {
        return Array.from(extSelector).filter(isHTMLElement);
    }

    return [];
}

export { parseSelector };

export default parseSelector;
