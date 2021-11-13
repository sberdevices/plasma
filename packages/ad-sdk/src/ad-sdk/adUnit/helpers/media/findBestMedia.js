import { getMediaFiles } from "../../../vastSelectors";
import canPlay from "./canPlay";
import sortMediaByBestFit from "./sortMediaByBestFit";

const getMediaByDefaultBestFit = (mediaFiles, screenRect) => {
    const sortedMediaFiles = sortMediaByBestFit(mediaFiles, screenRect);

    return sortedMediaFiles[0];
};

const findBestMedia = (inlineAd, videoElement, container, { getMediaFile = getMediaByDefaultBestFit }) => {
    const screenRect = container.getBoundingClientRect();
    const mediaFiles = getMediaFiles(inlineAd);

    if (mediaFiles) {
        const supportedMediaFiles = mediaFiles.filter((mediaFile) => canPlay(videoElement, mediaFile));
        const bestMediaFile = getMediaFile(supportedMediaFiles, screenRect);

        return bestMediaFile;
    }

    return null;
};

export default findBestMedia;
