import { getCreativeData } from "../../../vastSelectors";
import viewmode from "./viewmode";

const createSlot = (placeholder, width, height) => {
    const slot = document.createElement("DIV");

    Object.assign(slot.style, {
        border: "0px",
        cursor: "pointer",
        height: `${height}px`,
        left: "0px",
        margin: "0px",
        padding: "0px",
        position: "absolute",
        top: "0px",
        width: `${width}px`,
    });

    placeholder.appendChild(slot);

    return slot;
};
const initAd = (creativeAd, videoAdContainer, vastChain) => {
    const placeholder = videoAdContainer.element;
    const { width, height } = placeholder.getBoundingClientRect();
    const mode = viewmode(width, height);
    const desiredBitrate = -1;
    const environmentVars = {
        slot: createSlot(placeholder, width, height),
        videoSlot: videoAdContainer.videoElement,
        videoSlotCanAutoPlay: videoAdContainer.isOriginalVideoElement,
    };
    const creativeData = getCreativeData(vastChain[0].XML);

    creativeAd.initAd(width, height, mode, desiredBitrate, creativeData, environmentVars);
};

export default initAd;
