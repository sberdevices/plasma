export function addStyle(element, styles) {
    Object.keys(styles).forEach((styleKey) => {
        if (styles[styleKey] !== null && styles[styleKey] !== undefined) {
            element.style[styleKey] = styles[styleKey];
        }
    });
}
