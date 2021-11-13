import { get, getAll, getText, getAttributes } from "../xml";
import getLinearCreative from "./helpers/getLinearCreative";
import parseTime from "./helpers/parseTime";

const formatSize = (size) => {
    const match = `${size}`.match(/\d+/g);

    return parseInt(match[0], 10);
};

const formatPosition = (position) => {
    const isNumberString = /\d+/.test(position);

    if (isNumberString) {
        return formatSize(position);
    }

    return position;
};

const getIconAttributes = (iconElement) => {
    const { duration, height, offset, program, pxratio, width, xPosition = "right", yPosition = "top" } = getAttributes(
        iconElement
    );

    return {
        duration: duration && parseTime(duration),
        height: height && formatSize(height),
        offset: offset && parseTime(offset),
        program,
        pxratio: pxratio && parseInt(pxratio, 10),
        width: width && formatSize(width),
        xPosition: xPosition && formatPosition(xPosition),
        yPosition: yPosition && formatPosition(yPosition),
    };
};

const getIconResource = (iconElement) => {
    const staticResourceElement = get(iconElement, "StaticResource");
    const htmlResourceElement = get(iconElement, "HTMLResource");
    const iFrameResourceElement = get(iconElement, "IFrameResource");

    if (staticResourceElement) {
        return { staticResource: getText(staticResourceElement) };
    }

    if (htmlResourceElement) {
        return { htmlResource: getText(htmlResourceElement) };
    }

    if (iFrameResourceElement) {
        return { iFrameResource: getText(iFrameResourceElement) };
    }

    return {
        staticResource: getText(iconElement),
    };
};

const getIconViewTracking = (iconElement) => {
    const iconTrackingElements = getAll(iconElement, "IconViewTracking").map((iconViewTrackingElement) =>
        getText(iconViewTrackingElement)
    );

    if (iconTrackingElements.length === 0) {
        return {};
    }

    return {
        iconViewTracking: iconTrackingElements,
    };
};

const getIconClicks = (iconElement) => {
    const iconClicksElement = get(iconElement, "IconClicks");
    const iconClickThroughElement = iconClicksElement && get(iconClicksElement, "IconClickThrough");
    const iconClickTrackingElements =
        iconClicksElement &&
        getAll(iconClicksElement, "IconClickTracking").map((iconClickTrackingElement) =>
            getText(iconClickTrackingElement)
        );

    return {
        iconClickThrough: iconClickThroughElement && getText(iconClickThroughElement),
        iconClickTracking:
            iconClickTrackingElements && iconClickTrackingElements.length > 0 ? iconClickTrackingElements : undefined,
    };
};

const getIcons = (ad) => {
    const linearCreativeElement = ad && getLinearCreative(ad);
    const linearElement = linearCreativeElement && get(linearCreativeElement, "linear");
    const iconsElement = linearElement && get(linearElement, "Icons");
    const iconElements = iconsElement && getAll(iconsElement, "Icon");

    if (iconElements && iconElements.length > 0) {
        return iconElements.map((iconElement) => ({
            ...getIconAttributes(iconElement),
            ...getIconResource(iconElement),
            ...getIconViewTracking(iconElement),
            ...getIconClicks(iconElement),
        }));
    }

    return null;
};

export default getIcons;
