import onElementResize from "./onElementResize";
import onElementVisibilityChange from "./onElementVisibilityChange";

export {
    /**
     * onElementResize callback will be called whenever the target element resized.
     * Note: called with no params
     *
     * @ignore
     * @callback resizeCallback
     */

    /**
     * @function onElementResize
     *
     * @ignore
     * @static
     * @description Helper function to know if an element has been resized.
     *
     * @param {HTMLElement} target - The element that we want to observe.
     * @param {function} callback - The callback that handles the resize. See [resizeCallback]{@link module:element-observers~resizeCallback}.
     * @param {Object} [options] - Options Map.
     * @param {number} [options.threshold] - sets a debounce threshold for the callback. Defaults to 20 milliseconds
     *
     * @returns {function} - unsubscribe function.
     * @ignore
     */
    onElementResize,
    /**
     * onElementResize callback called whenever the target element resized.
     *
     * @ignore
     * @param {boolean} isVisible - true if the target element is visible and false otherwise.
     * @callback visibilityCallback
     */

    /**
     * @function onElementVisibilityChange
     *
     * @ignore
     * @static
     * @description Helper function to know if the visibility of an element has changed.
     *
     * @param {HTMLElement} target - The element that we want to observe.
     * @param {function} callback - The callback that handles the resize.  See [visibilityCallback]{@link module:element-observers~visibilityCallback}.
     * @param {Object} [options] - Options Map.
     * @param {number} [options.threshold] - sets a debounce threshold for the callback. Defaults to 100 milliseconds.
     * @param {HTMLElement} [options.scrollableElement] - specifies the hook element for the scroll to check for visibility changes.
     *  Defaults to [window]{@link https://developer.mozilla.org/en-US/docs/Web/API/Window}.
     * @param {number} [options.viewabilityOffset] - Offset fraction. Percentage of the element that needs to be hidden to be considered not visible.
     *  Defaults to 0.4
     *
     * @returns {function} - unsubscribe function.
     */
    onElementVisibilityChange,
};
