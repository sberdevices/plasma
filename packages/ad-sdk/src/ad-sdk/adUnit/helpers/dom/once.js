const once = (element, eventName, listener) => {
    const handler = (...args) => {
        element.removeEventListener(eventName, handler);

        return listener(...args);
    };

    element.addEventListener(eventName, handler);

    return () => {
        element.removeEventListener(eventName, handler);
    };
};

export default once;
