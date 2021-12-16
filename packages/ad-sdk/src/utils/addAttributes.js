export function addAttributes(element, attributes) {
    Object.keys(attributes).forEach((attributeKey) => element.setAttribute(attributeKey, attributes[attributeKey]));
}
