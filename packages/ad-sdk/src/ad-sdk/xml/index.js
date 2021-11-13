import xml2js from "./helpers/xml2js";
import { get, getAll, getFirstChild, getText, getAttributes, getAttribute } from "./helpers/xmlSelectors";

const parser = new DOMParser();

/**
 * Parses the passed xml text.
 *
 * @global
 * @typedef parseXml
 * @throws if there is an error parsing the xml.
 * @param {string} xmlText - XML text to be parsed.
 * @returns {Object} - Returns the parsed xml document as a js object.
 * @static
 */
export const parseXml = (xmlText) => xml2js(parser, xmlText);

export { get, getAll, getFirstChild, getText, getAttributes, getAttribute };
