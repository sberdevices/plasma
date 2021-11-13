import { getInteractiveFiles } from "../../../vastSelectors";
import isSupported from "./isSupported";

const loadCreative = async (vastChain, videoAdContainer) => {
    const creative = (getInteractiveFiles(vastChain[0].ad) || []).filter(isSupported)[0];

    if (!creative) {
        throw new TypeError("VastChain does not contain a supported vpaid creative");
    }

    const { src, type } = creative;

    await videoAdContainer.addScript(src, { type });

    const context = videoAdContainer.executionContext;

    return context.getVPAIDAd();
};

export default loadCreative;
