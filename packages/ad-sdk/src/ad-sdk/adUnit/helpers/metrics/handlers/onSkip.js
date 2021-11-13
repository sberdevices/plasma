/* eslint-disable callback-return, promise/prefer-await-to-callbacks */
import { linearEvents } from "../../../../tracker";

const { skip } = linearEvents;
const createDefaultSkipControl = () => {
    const skipBtn = document.createElement("BUTTON");

    skipBtn.classList.add("mol-vast-skip-control");
    skipBtn.type = "button";
    skipBtn.innerHTML = "skip";
    skipBtn.style.position = "absolute";
    skipBtn.style.bottom = "15px";
    skipBtn.style.right = "15px";

    return skipBtn;
};

const onSkip = (videoAdContainer, callback, { skipoffset, createSkipControl = createDefaultSkipControl } = {}) => {
    if (!Boolean(skipoffset)) {
        return () => {};
    }

    let skipControl;
    const { videoElement, element } = videoAdContainer;

    const skipHandler = () => {
        const currentTimeMs = videoElement.currentTime * 1000;

        if (!Boolean(skipControl) && currentTimeMs >= skipoffset) {
            skipControl = createSkipControl();

            skipControl.onclick = (event) => {
                if (Event.prototype.stopPropagation !== undefined) {
                    event.stopPropagation();
                }

                callback(skip);

                return false;
            };

            element.appendChild(skipControl);
            videoElement.removeEventListener("timeupdate", skipHandler);
        }
    };

    videoElement.addEventListener("timeupdate", skipHandler);

    return () => {
        videoElement.removeEventListener("timeupdate", skipHandler);
        if (Boolean(skipControl)) {
            element.removeChild(skipControl);
        }
    };
};

export default onSkip;
