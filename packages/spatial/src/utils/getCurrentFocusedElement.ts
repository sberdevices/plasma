function getCurrentFocusedElement(): HTMLElement | null {
    const { activeElement } = document;
    if (activeElement && activeElement !== document.body) {
        return activeElement as HTMLElement;
    }
    return null;
}

export { getCurrentFocusedElement };

export default getCurrentFocusedElement;
