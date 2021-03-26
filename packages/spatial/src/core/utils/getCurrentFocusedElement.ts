import { isHTMLElement } from './isHTMLElement';

export function getCurrentFocusedElement(): HTMLElement | null {
    const { activeElement } = document;

    if (isHTMLElement(activeElement)) {
        return activeElement;
    }

    return null;
}
