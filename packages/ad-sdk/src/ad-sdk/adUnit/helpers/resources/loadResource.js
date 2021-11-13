/* eslint-disable promise/prefer-await-to-then, promise/always-return */
import waitFor from "../dom/waitFor";
import createResource from "./createResource";

const noop = () => {};
const loadResource = (icon, { document, placeholder }) =>
    new Promise((resolve, reject) => {
        try {
            const resourceElement = createResource(document, icon);
            const resourceErrorWait = waitFor(resourceElement, "error");
            const resourceLoadWait = waitFor(resourceElement, "load");
            const cleanUp = () => {
                if (placeholder.contains(resourceElement)) {
                    placeholder.removeChild(resourceElement);
                    resourceElement.style.zIndex = 0;
                }
            };

            resourceErrorWait.promise
                .then(() => {
                    resourceLoadWait.cancel();
                    cleanUp();

                    reject(new Error("Error loading resource"));
                })
                .catch(noop);

            resourceLoadWait.promise
                .then(() => {
                    resourceErrorWait.cancel();
                    cleanUp();

                    resolve(resourceElement);
                })
                .catch(noop);

            // Some browsers will not load the resource if they are not added to the DOM
            resourceElement.style.zIndex = -9999;
            placeholder.appendChild(resourceElement);
        } catch (error) {
            reject(error);
        }
    });

export default loadResource;
