/* eslint-disable filenames/match-regex, id-match */
import saneError from "sane-domparser-error";
import xmlToJson from "./xmlToJson";

const xml2js = (parser, xmlText) => {
    const xmlDom = parser.parseFromString(xmlText, "application/xml");

    saneError.failOnParseError(xmlDom);

    return xmlToJson(xmlDom);
};

export default xml2js;
