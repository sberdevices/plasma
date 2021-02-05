import { ExtendedSelector } from '../utils/types';

function matchSelector(element: HTMLElement, extSelector: ExtendedSelector): boolean {
    if (typeof extSelector === 'string') {
        return element.webkitMatchesSelector(extSelector);
    }

    if (Array.isArray(extSelector)) {
        return extSelector.includes(element);
    }

    if (extSelector instanceof NodeList) {
        const nodeList = Array.from(extSelector);
        return nodeList.includes(element);
    }

    if (extSelector instanceof HTMLElement) {
        if (extSelector.nodeType === Node.ELEMENT_NODE) {
            return element === extSelector;
        }
        return false;
    }

    return false;
}

export { matchSelector };

export default matchSelector;
