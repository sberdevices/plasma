/* eslint-disable no-shadow */
const calculateArea = ({ height, width }) => height * width;

export const hasSpace = (newIcon, config) => {
    const { drawnIcons, placeholder } = config;
    const placeholderArea = calculateArea(placeholder.getBoundingClientRect());
    const iconArea = calculateArea(newIcon);
    const usedIconsArea = drawnIcons.reduce((accumulator, icon) => accumulator + calculateArea(icon), 0);

    return iconArea + usedIconsArea <= placeholderArea * 0.35;
};

export const withinBoundaries = (newIcon, { placeholder }) => {
    const phRect = placeholder.getBoundingClientRect();

    return (
        newIcon.left >= 0 &&
        newIcon.left + newIcon.width <= phRect.width &&
        newIcon.top >= 0 &&
        newIcon.top + newIcon.height <= phRect.height
    );
};

const right = ({ left, width }) => left + width;
const left = ({ left }) => left;
const top = ({ top }) => top;
const bottom = ({ top, height }) => top + height;
const overlap = (newIcon, drawnIcon) => {
    if (
        left(newIcon) > right(drawnIcon) ||
        right(newIcon) < left(drawnIcon) ||
        bottom(newIcon) < top(drawnIcon) ||
        top(newIcon) > bottom(drawnIcon)
    ) {
        return false;
    }

    return true;
};

export const withoutOverlaps = (newIcon, { drawnIcons }) =>
    !drawnIcons.some((drawnIcon) => overlap(newIcon, drawnIcon));

const canBeRendered = (newIcon, config) => {
    const thereIsSpace = hasSpace(newIcon, config);
    const isWithinTheContentArea = withinBoundaries(newIcon, config);
    const doesNotOverlap = withoutOverlaps(newIcon, config);

    return thereIsSpace && isWithinTheContentArea && doesNotOverlap;
};

export default canBeRendered;
