/* eslint-disable promise/prefer-await-to-callbacks */
import debounce from "lodash.debounce";
import IntersectionObserver from "./helpers/IntersectionObserver";

const validate = (target, callback) => {
    if (!(target instanceof Element)) {
        throw new TypeError("Target is not an Element node");
    }

    if (!(callback instanceof Function)) {
        throw new TypeError("Callback is not a function");
    }
};

const noop = () => {};

const intersectionHandlers = Symbol("intersectionHandlers");
const observerKey = Symbol("intersectionObserver");

const onIntersection = (target, callback) => {
    if (!target[intersectionHandlers]) {
        target[intersectionHandlers] = [];

        const execHandlers = (...args) => {
            if (target[intersectionHandlers]) {
                target[intersectionHandlers].forEach((handler) => handler(...args));
            }
        };

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: [...new Array(11)].map((item, index) => index / 10),
        };

        target[observerKey] = new IntersectionObserver(execHandlers, options);
        target[observerKey].observe(target);
    }

    target[intersectionHandlers].push(callback);

    return () => {
        target[intersectionHandlers] = target[intersectionHandlers].filter((handler) => handler !== callback);

        if (target[intersectionHandlers].length === 0) {
            target[observerKey].disconnect();

            delete target[intersectionHandlers];
            delete target[observerKey];
        }
    };
};

let visibilityHandlers = [];

const onVisibilityChange = (target, callback) => {
    const execHandlers = (...args) => {
        if (visibilityHandlers) {
            visibilityHandlers.forEach((handler) => handler(...args));
        }
    };

    visibilityHandlers.push(callback);

    if (visibilityHandlers.length === 1) {
        document.addEventListener("visibilitychange", execHandlers);
    }

    return () => {
        visibilityHandlers = visibilityHandlers.filter((handler) => handler !== callback);

        if (visibilityHandlers.length === 0) {
            document.removeEventListener("visibilitychange", execHandlers);
        }
    };
};

let lastIntersectionEntries = [];

const onElementVisibilityChange = (target, callback, { threshold = 100, viewabilityOffset = 0.4 } = {}) => {
    validate(target, callback);

    if (!Boolean(IntersectionObserver)) {
        // NOTE: visibility is not determined
        callback(undefined);

        return noop;
    }

    let lastIsInViewport = false;

    const checkVisibility = (entries) => {
        entries.forEach((entry) => {
            if (entry.target === target) {
                const isInViewport = !document.hidden && entry.intersectionRatio > viewabilityOffset;

                if (isInViewport !== lastIsInViewport) {
                    lastIsInViewport = isInViewport;

                    // eslint-disable-next-line callback-return
                    callback(isInViewport);
                }
            }
        });
        lastIntersectionEntries = entries;
    };

    const visibilityHandler = debounce(checkVisibility, threshold);
    const stopObservingIntersection = onIntersection(target, visibilityHandler);
    const stopListeningToVisibilityChange = onVisibilityChange(target, () =>
        visibilityHandler(lastIntersectionEntries)
    );

    return () => {
        stopObservingIntersection();
        stopListeningToVisibilityChange();
    };
};

export default onElementVisibilityChange;
