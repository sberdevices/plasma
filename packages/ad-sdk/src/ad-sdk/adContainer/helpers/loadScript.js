/**
 * Loads the script source.
 *
 * @ignore
 * @param {string} src - The script source.
 * @param {Object} options - The allowed options are:
 *                           type: Defaults to 'text/javascript'.
 *                           async<Boolean> : if "true" the "async" attribute is added to the new script. Defaults to false.
 *                           defer<Boolean> : if "true" the "defer" attribute is added to the new script. Defaults to false.
 *                           placeholder: Element that should contain the script. Defaults to the parentNode of the currentScript or
 *                                        if missing to document.head .
 */
const loadScript = function (src, { async = false, defer = false, type = "text/javascript", placeholder } = {}) {
    if (!src) {
        throw new TypeError('Missing required "src" parameter');
    }

    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        let scriptPlaceholder = placeholder;

        script.type = type;
        script.async = async;
        script.defer = defer;
        script.onerror = () => reject(new URIError(`The script ${src} is not accessible.`));
        script.onload = () => resolve(script);

        if (!scriptPlaceholder) {
            scriptPlaceholder = document.currentScript
                ? /* istanbul ignore next */
                  document.currentScript.parentNode
                : document.head;
        }

        script.src = src;
        scriptPlaceholder.appendChild(script);
    });
};

export default loadScript;
