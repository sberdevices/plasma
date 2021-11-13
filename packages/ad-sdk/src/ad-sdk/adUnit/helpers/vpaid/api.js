export const handshakeVersion = "handshakeVersion";
export const initAd = "initAd";
export const resizeAd = "resizeAd";
export const startAd = "startAd";
export const stopAd = "stopAd";
export const pauseAd = "pauseAd";
export const resumeAd = "resumeAd";
export const expandAd = "expandAd";
export const skipAd = "skipAd";
export const collapseAd = "collapseAd";
export const getAdLinear = "getAdLinear";
export const getAdWidth = "getAdWidth";
export const getAdHeight = "getAdHeight";
export const getAdExpanded = "getAdExpanded";
export const getAdSkippableState = "getAdSkippableState";
export const getAdRemainingTime = "getAdRemainingTime";
export const getAdDuration = "getAdDuration";
export const getAdVolume = "getAdVolume";
export const getAdCompanions = "getAdCompanions";
export const getAdIcons = "getAdIcons";
export const setAdVolume = "setAdVolume";
export const adLoaded = "AdLoaded";
export const adStarted = "AdStarted";
export const adStopped = "AdStopped";
export const adSkipped = "AdSkipped";
export const adSkippableStateChange = "AdSkippableStateChange";
export const adSizeChange = "AdSizeChange";
export const adLinearChange = "AdLinearChange";
export const adDurationChange = "AdDurationChange";
export const adExpandedChange = "AdExpandedChange";
export const adRemainingTimeChange = "AdRemainingTimeChange";
export const adVolumeChange = "AdVolumeChange";
export const adImpression = "AdImpression";
export const adVideoStart = "AdVideoStart";
export const adVideoFirstQuartile = "AdVideoFirstQuartile";
export const adVideoMidpoint = "AdVideoMidpoint";
export const adVideoThirdQuartile = "AdVideoThirdQuartile";
export const adVideoComplete = "AdVideoComplete";
export const adClickThru = "AdClickThru";
export const adInteraction = "AdInteraction";
export const adUserAcceptInvitation = "AdUserAcceptInvitation";
export const adUserMinimize = "AdUserMinimize";
export const adUserClose = "AdUserClose";
export const adPaused = "AdPaused";
export const adPlaying = "AdPlaying";
export const adLog = "AdLog";
export const adError = "AdError";

export const EVENTS = [
    adLoaded,
    adStarted,
    adStopped,
    adSkipped,
    adSkippableStateChange,
    adSizeChange,
    adLinearChange,
    adDurationChange,
    adExpandedChange,
    adRemainingTimeChange,
    adVolumeChange,
    adImpression,
    adVideoStart,
    adVideoFirstQuartile,
    adVideoMidpoint,
    adVideoThirdQuartile,
    adVideoComplete,
    adClickThru,
    adInteraction,
    adUserAcceptInvitation,
    adUserMinimize,
    adUserClose,
    adPaused,
    adPlaying,
    adLog,
    adError,
];

export const METHODS = [
    handshakeVersion,
    initAd,
    resizeAd,
    startAd,
    stopAd,
    pauseAd,
    resumeAd,
    expandAd,
    collapseAd,

    // VPAID 2.0 new methods
    skipAd,
];

export const GETTERS = [
    getAdLinear,
    getAdExpanded,
    getAdRemainingTime,
    getAdVolume,

    // VPAID 2.0 new getters
    getAdWidth,
    getAdHeight,
    getAdSkippableState,
    getAdDuration,
    getAdCompanions,
    getAdIcons,
];

export const SETTERS = [setAdVolume];
