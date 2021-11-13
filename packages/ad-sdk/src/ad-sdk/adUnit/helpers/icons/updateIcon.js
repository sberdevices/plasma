const isCustomXposition = (xPosition) => !["left", "right"].includes(String(xPosition).toLowerCase());
const isCustomYPosition = (yPosition) => !["top", "bottom"].includes(String(yPosition).toLowerCase());
const calculateIconLeft = (dynamicPos, iconWidth, drawnIcons, phWidth) => {
    const drawnIconsWidth = drawnIcons.reduce((accumulator, icon) => accumulator + icon.width + 1, 0);

    if (dynamicPos === "left") {
        return drawnIconsWidth;
    }

    return phWidth - drawnIconsWidth - iconWidth;
};

const calculateIconTop = (dynamicPos, iconHeight, phHeight) => {
    if (dynamicPos === "top") {
        return 0;
    }

    return phHeight - iconHeight;
};

const updateIcon = (icon, iconElement, { drawnIcons, placeholder }) => {
    const oldSignature = icon.signature;
    const rect = iconElement.getBoundingClientRect();
    const phRect = placeholder.getBoundingClientRect();
    const width = icon.width || rect.width;
    const height = icon.height || rect.height;
    const xPosition = icon.xPosition || "right";
    const yPosition = icon.yPosition || "top";
    let left;
    let top;

    if (isCustomXposition(xPosition)) {
        left = xPosition;
    } else {
        const icons = drawnIcons.filter((dIcon) => dIcon.xPosition === xPosition && dIcon.yPosition === yPosition);

        left = calculateIconLeft(xPosition, width, icons, phRect.width);
    }
    if (isCustomYPosition(yPosition)) {
        top = yPosition;
    } else {
        top = calculateIconTop(yPosition, height, phRect.height);
    }

    const signature = `${left}-${top}_${width}x${height}`;

    return Object.assign(icon, {
        height,
        left,
        signature,
        top,
        updated: oldSignature !== signature,
        width,
    });
};

export default updateIcon;
