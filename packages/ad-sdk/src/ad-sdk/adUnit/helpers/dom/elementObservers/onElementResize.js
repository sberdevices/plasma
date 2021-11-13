/* eslint-disable promise/prefer-await-to-callbacks */
import debounce from "lodash.debounce";
import MutationObserver from "./helpers/MutationObserver";

const validate = (target, callback) => {
    if (!(target instanceof Element)) {
        throw new TypeError("Target is not an Element node");
    }

    if (!(callback instanceof Function)) {
        throw new TypeError("Callback is not a function");
    }
};
const noop = () => {};
const sizeMutationAttrs = ["style", "clientWidth", "clientHeight"];
const createResizeMO = (target, callback) => {
    const observer = new MutationObserver((mutations) => {
        for (let index = 0; index < mutations.length; index++) {
            const { attributeName } = mutations[index];

            if (sizeMutationAttrs.includes(attributeName)) {
                // eslint-disable-next-line callback-return
                callback();
            }
        }
    });

    observer.observe(target, {
        attributes: true,
        characterData: false,
        childList: true,
    });

    return observer;
};
const mutationHandlers = Symbol("mutationHandlers");
const observerKey = Symbol("mutationObserver");
const onMutation = (target, callback) => {
    if (!target[mutationHandlers]) {
        target[mutationHandlers] = [];

        const execHandlers = (...args) => {
            if (target[mutationHandlers]) {
                target[mutationHandlers].forEach((handler) => handler(...args));
            }
        };

        target[observerKey] = createResizeMO(target, execHandlers);
    }

    target[mutationHandlers].push(callback);

    return () => {
        target[mutationHandlers] = target[mutationHandlers].filter((handler) => handler !== callback);

        if (target[mutationHandlers].length === 0) {
            target[observerKey].disconnect();

            delete target[mutationHandlers];
            delete target[observerKey];
        }
    };
};

const createResizeElement = (callback) => {
    const iframe = document.createElement("iframe");

    // eslint-disable-next-line max-len
    iframe.setAttribute(
        "style",
        "display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; border: 0; overflow: hidden; pointer-events: none; z-index: -1;"
    );
    iframe.onload = function () {
        if (this.contentWindow) {
            this.contentWindow.addEventListener("resize", callback);
        }
    };
    iframe.type = "text/html";
    iframe.src = "about:blank";
    iframe.loading = "eager";

    return iframe;
};
const resizeHandlers = Symbol("resizeHandlers");
const resizeElement = Symbol("resizeElement");

// Original code http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/
const onResize = (target, callback) => {
    if (!target[resizeHandlers]) {
        target[resizeHandlers] = [];
        const execHandlers = (...args) => {
            if (target[resizeHandlers]) {
                target[resizeHandlers].forEach((handler) => handler(...args));
            }
        };

        target[resizeElement] = createResizeElement(execHandlers);

        if (getComputedStyle(target).position === "static") {
            target.style.position = "relative";
        }

        target.appendChild(target[resizeElement]);
    }

    target[resizeHandlers].push(callback);

    return () => {
        target[resizeHandlers] = target[resizeHandlers].filter((handler) => handler !== callback);

        if (target[resizeHandlers].length === 0) {
            target.removeChild(target[resizeElement]);
            delete target[resizeHandlers];
            delete target[resizeElement];
        }
    };
};

const onElementResize = function (target, callback, { threshold = 20 } = {}) {
    validate(target, callback);

    const makeSizeId = ({ style, clientHeight, clientWidth }) =>
        [style.width, style.height, clientWidth, clientHeight].join(".");
    let lastSize = makeSizeId(target);
    const checkElementSize = () => {
        const currentSize = makeSizeId(target);

        if (currentSize !== lastSize) {
            lastSize = currentSize;
            // eslint-disable-next-line callback-return
            callback();
        }
    };

    const checkElementHandler = debounce(checkElementSize, threshold);
    const stopObservingMutations = Boolean(MutationObserver) ? onMutation(target, checkElementHandler) : noop;
    const stopListeningToResize = onResize(target, checkElementHandler);

    return () => {
        stopObservingMutations();
        stopListeningToResize();
    };
};

export default onElementResize;
