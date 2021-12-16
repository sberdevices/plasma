import { addStyle } from "./addStyle";
import { addAttributes } from "./addAttributes";

export function createElement({ elementName, namespace, id, style, attributes, innerText, classList }) {
    let element;
    if (namespace) {
        element = document.createElementNS(namespace, elementName);
    } else {
        element = document.createElement(elementName);
    }
    if (style) {
        addStyle(element, style);
    }
    if (typeof id === "string" || typeof id === "number") {
        element.id = id;
    }
    if (attributes) {
        addAttributes(element, attributes);
    }
    if (innerText) {
        element.innerText = innerText;
    }
    if (Array.isArray(classList)) {
        classList.forEach((className) => {
            element.classList.add(className);
        });
    }

    return element;
}
