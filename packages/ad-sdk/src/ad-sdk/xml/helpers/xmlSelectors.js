const getChildren = ({ elements = [] } = {}) => elements;

const findChildByName = (element, childName) =>
    getChildren(element).find(({ name = "" }) => name.toUpperCase() === childName.toUpperCase());

const filterChildrenByName = (element, childrenName) =>
    getChildren(element).filter(({ name = "" }) => name.toUpperCase() === childrenName.toUpperCase());

/**
 * Get the first child element from the passed parsed xml element.
 *
 * @memberof module:vast-xml2js
 * @param {Object} element - Parsed xml element object.
 * @param {string} childName - Child element name
 * @returns {Object|undefined} - the first child element with the passed name or undefined if not found.
 */
export const get = findChildByName;

/**
 * Get all the children elements of the passed parsed xml element filtered by the passed child name if passed.
 *
 * @memberof module:vast-xml2js
 * @param {Object} element - Parsed xml element object.
 * @param {string} [childName] - Child element name.
 * @returns {Array} - Array of child elements or an empty array.
 */
export const getAll = (element, childName) => {
    if (typeof childName === "string") {
        return filterChildrenByName(element, childName);
    }

    return getChildren(element);
};

/**
 * Get the first child element from the passed parsed xml element.
 *
 * @memberof module:vast-xml2js
 * @returns {Object|null} - the first child element or undefined if there are non.
 */
export const getFirstChild = (element) => getChildren(element)[0] || null;

/**
 * Get the text value of the passed parsed xml element or null if there is non.
 *
 * @memberof module:vast-xml2js
 * @returns {string|null} - text of the element or null.
 */
export const getText = (element) => {
    const firstChild = element && getFirstChild(element);

    return (firstChild && firstChild.text) || null;
};

/**
 * Get all the attributes of the passed parsed xml element.
 *
 * @memberof module:vast-xml2js
 * @returns {Object} - Object with the element attributes.
 */
export const getAttributes = ({ attributes = {} } = {}) => attributes;

/**
 * Get the attribute with the passed name of the passed parsed xml element.
 *
 * @memberof module:vast-xml2js
 * @returns {number|string|undefined} - Attribute value or undefined.
 */
export const getAttribute = (element, attributeName) => getAttributes(element)[attributeName];
