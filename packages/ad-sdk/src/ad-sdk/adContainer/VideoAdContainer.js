/* eslint-disable promise/prefer-await-to-then */
import loadScript from "./helpers/loadScript";
import createAdVideoElement from "./helpers/createAdVideoElement";
import createAdContainer from "./helpers/createAdContainer";
import createIframe from "./helpers/createIframe";
import getContentDocument from "./helpers/getContentDocument";
import unique from "./helpers/unique";

const nextId = unique("videoAdContainer");
const hidden = Symbol("hidden");

/**
 * @class
 * @alias VideoAdContainer
 * @description This class provides everything necessary to contain and create a video ad within a given placeholder Element.
 */
class VideoAdContainer {
    /**
     * Creates a VideoAdContainer.
     *
     * @param {HTMLDivElement} placeholder - DIV that will contain the ad.
     * @param {HTMLVideoElement} [videoElement] - optional videoElement that will be used to play the ad.
     */
    constructor(placeholder, videoElement = null) {
        if (!(placeholder instanceof Element)) {
            throw new TypeError("placeholder is not an Element");
        }

        this[hidden] = {
            destroyed: false,
            iframe: null,
            readyPromise: null,
        };

        this[hidden].id = nextId();
        this.element = createAdContainer();
        this.executionContext = null;

        this.isOriginalVideoElement = Boolean(videoElement);

        if (videoElement) {
            this.videoElement = videoElement;
        } else {
            this.videoElement = createAdVideoElement();
            this.element.appendChild(this.videoElement);
        }

        placeholder.appendChild(this.element);
    }

    /**
     * Adds the passed script to the ad container.
     *
     * @param {string} src - script source uri.
     * @param {Object} options - Options map.
     * @param {string} options.type - Defaults to 'text/javascript'.
     * @param {boolean} options.async - if "true" the "async" attribute is added to the new script. Defaults to false.
     * @param {boolean} options.defer - if "true" the "defer" attribute is added to the new script. Defaults to true.
     */
    async addScript(src, options = {}) {
        if (this.isDestroyed()) {
            throw new Error("VideoAdContainer has been destroyed");
        }

        if (!this[hidden].iframe) {
            this[hidden].iframe = await createIframe(this.element, this[hidden].id);
            this.executionContext = this[hidden].iframe.contentWindow;
        }

        const placeholder = getContentDocument(this[hidden].iframe).body;

        return loadScript(src, {
            placeholder,
            ...options,
        });
    }

    /**
     * Destroys the VideoAdContainer.
     */
    destroy() {
        // NOTE: calling destroy immediately terminates the iframe and cancels
        //       tracking requests from vpaid script, so destroying should
        //       immediately hides and remove the iframe from dom after timeout
        const removePromise = new Promise((resolve) => {
            setTimeout(() => {
                this.element.parentNode.removeChild(this.element);
                resolve();
            }, 1000);
        });

        this.element.style.zIndex = -9999;
        this[hidden].destroyed = true;

        return removePromise;
    }

    /**
     * Checks if the container is destroyed.
     *
     * @returns {boolean} - true if the container is destroyed and false otherwise.
     */
    isDestroyed() {
        return this[hidden].destroyed;
    }
}

export default VideoAdContainer;
