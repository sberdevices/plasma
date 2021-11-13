import loadResource from "../resources/loadResource";
import updateIcon from "./updateIcon";
import canBeRendered from "./canBeRendered";

const noop = () => {};
const wrapWithClickThrough = (iconElement, icon, { onIconClick = noop } = {}) => {
    const anchor = document.createElement("A");

    if (icon.iconClickthrough) {
        anchor.href = icon.iconClickthrough;
        anchor.target = "_blank";
    }

    // NOTE: if iframe icon disable pointer events so that clickThrough and click tracking work
    if (Boolean(icon.iFrameResource)) {
        iconElement.style.pointerEvents = "none";
    }

    anchor.onclick = (event) => {
        if (Event.prototype.stopPropagation !== undefined) {
            event.stopPropagation();
        }

        onIconClick(icon);
    };

    anchor.appendChild(iconElement);

    return anchor;
};

const createIcon = async (icon, config) => {
    if (!icon.element) {
        const iconResource = await loadResource(icon, config);

        iconResource.width = "100%";
        iconResource.height = "100%";
        iconResource.style.height = "100%";
        iconResource.style.width = "100%";

        icon.element = wrapWithClickThrough(iconResource, icon, config);
    }

    return icon.element;
};

const updateIconElement = (iconElement, icon) => {
    const { height, width, left, top, yPosition } = icon;

    iconElement.height = height;
    iconElement.width = width;
    iconElement.style.position = "absolute";
    iconElement.style.left = `${left}px`;

    // NOTE: This if is a bit odd but some browser don't calculate the placeholder height pixel perfect and,
    //       setting the top of the icon will change the size of the icon's placeholder this if prevents that situation
    if (yPosition === "bottom") {
        iconElement.style.bottom = "0";
    } else {
        iconElement.style.top = `${top}px`;
    }
    iconElement.style.height = `${height}px`;
    iconElement.style.width = `${width}px`;

    return iconElement;
};

const renderIcon = async (icon, config) => {
    const { placeholder } = config;
    const iconElement = await createIcon(icon, config);
    const updatedIcon = updateIcon(icon, iconElement, config);

    if (canBeRendered(updatedIcon, config)) {
        if (!iconElement.parentNode || icon.updated) {
            placeholder.appendChild(updateIconElement(iconElement, updatedIcon));
        }
    } else {
        if (iconElement.parentNode) {
            iconElement.parentNode.removeChild(iconElement);
        }
        throw new Error("Icon can't be rendered");
    }

    return updatedIcon;
};

export default renderIcon;
