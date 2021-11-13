/* eslint-disable callback-return, promise/prefer-await-to-callbacks */
import { linearEvents } from "../../../../tracker";

const { clickThrough } = linearEvents;

const onClickThrough = ({ videoElement, element }, callback, { clickThroughUrl } = {}) => {
    const placeholder = element || videoElement.parentNode;
    const anchor = document.createElement("A");

    anchor.classList.add("mol-vast-clickthrough");
    anchor.style.width = "100%";
    anchor.style.height = "100%";
    anchor.style.position = "absolute";
    anchor.style.left = 0;
    anchor.style.top = 0;

    if (clickThroughUrl) {
        anchor.href = clickThroughUrl;
        anchor.target = "_blank";
    }

    anchor.onclick = (event) => {
        if (Event.prototype.stopPropagation !== undefined) {
            event.stopPropagation();
        }

        if (videoElement.paused) {
            if (Event.prototype.preventDefault !== undefined) {
                event.preventDefault();
            }

            videoElement.play();
        } else {
            videoElement.pause();

            callback(clickThrough);
        }
    };

    placeholder.appendChild(anchor);

    return () => placeholder.removeChild(anchor);
};

export default onClickThrough;
