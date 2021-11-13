/* eslint-disable promise/prefer-await-to-callbacks, class-methods-use-this, import/no-named-as-default-member */
import linearEvents from "../tracker/linearEvents";
import { acceptInvitation, adCollapse } from "../tracker/nonLinearEvents";
import { getClickThrough } from "../vastSelectors";
import { volumeChanged, adProgress } from "./adUnitEvents";
import loadCreative from "./helpers/vpaid/loadCreative";
import {
    adLoaded,
    adStarted,
    adStopped,
    adPlaying,
    adPaused,
    startAd,
    stopAd,
    resumeAd,
    pauseAd,
    skipAd,
    setAdVolume,
    getAdVolume,
    getAdDuration,
    resizeAd,
    adSizeChange,
    adError,
    adVideoComplete,
    adSkipped,
    EVENTS,
    adVolumeChange,
    adImpression,
    adVideoStart,
    adVideoFirstQuartile,
    adVideoMidpoint,
    adVideoThirdQuartile,
    adUserAcceptInvitation,
    adUserMinimize,
    adUserClose,
    adDurationChange,
    adRemainingTimeChange,
    adClickThru,
    getAdIcons,
    getAdRemainingTime,
} from "./helpers/vpaid/api";
import waitFor from "./helpers/vpaid/waitFor";
import callAndWait from "./helpers/vpaid/callAndWait";
import handshake from "./helpers/vpaid/handshake";
import initAd from "./helpers/vpaid/initAd";
import VideoAdUnit, { _protected } from "./VideoAdUnit";

const {
    complete,
    mute,
    unmute,
    skip,
    start,
    firstQuartile,
    pause,
    resume,
    impression,
    midpoint,
    thirdQuartile,
    clickThrough,
    error: errorEvt,
    closeLinear,
    creativeView,
} = linearEvents;

// NOTE some ads only allow one handler per event and we need to subscribe to the adLoaded to know the creative is loaded.
const VPAID_EVENTS = EVENTS.filter((event) => event !== adLoaded);

// eslint-disable-next-line id-match
const _private = Symbol("_private");

const vpaidGeneralError = (payload) => {
    const error = payload instanceof Error ? payload : new Error("VPAID general error");

    if (!error.code) {
        error.code = 901;
    }

    return error;
};

/**
 * @class
 * @alias VpaidAdUnit
 * @extends VideoAdUnit
 * @implements NonLinearEvents
 * @implements LinearEvents
 * @description This class provides everything necessary to run a Vpaid ad.
 */
class VpaidAdUnit extends VideoAdUnit {
    /**
     * Creates a {VpaidAdUnit}.
     *
     * @param {VastChain} vastChain - The {@link VastChain} with all the {@link VastResponse}
     * @param {VideoAdContainer} videoAdContainer - container instance to place the ad
     * @param {Object} [options] - Options Map. The allowed properties are:
     * @param {Console} [options.logger] - Optional logger instance. Must comply to the [Console interface]{@link https://developer.mozilla.org/es/docs/Web/API/Console}.
     * Defaults to `window.console`
     * @param {boolean} [options.viewability] - if true it will pause the ad whenever is not visible for the viewer.
     * Defaults to `false`
     * @param {boolean} [options.responsive] - if true it will resize the ad unit whenever the ad container changes sizes
     * Defaults to `false`
     * Defaults to `window.console`
     */
    constructor(vastChain, videoAdContainer, options = {}) {
        super(vastChain, videoAdContainer, options);

        /** Ad unit type. Will be `VPAID` for VpaidAdUnit */
        this.type = "VPAID";

        /** Reference to the Vpaid Creative ad unit. Will be null before the ad unit starts. */
        this.creativeAd = null;

        this[_private] = {
            evtHandler: {
                [adClickThru]: (url, id, playerHandles) => {
                    if (playerHandles) {
                        if (this.paused()) {
                            this.resume();
                        } else {
                            const clickThroughUrl =
                                typeof url === "string" && url.length > 0 ? url : getClickThrough(this.vastChain[0].ad);

                            this.pause();
                            window.open(clickThroughUrl, "_blank");
                        }
                    }

                    this.emit(clickThrough, {
                        adUnit: this,
                        type: clickThrough,
                    });
                },
                [adDurationChange]: () => {
                    this.emit(adProgress, {
                        adUnit: this,
                        type: adProgress,
                    });
                },
                [adError]: (payload) => {
                    this.error = vpaidGeneralError(payload);
                    this.errorCode = this.error.code;

                    this[_protected].onErrorCallbacks.forEach((callback) =>
                        callback(this.error, {
                            adUnit: this,
                            vastChain: this.vastChain,
                        })
                    );

                    this[_protected].finish();

                    this.emit(errorEvt, {
                        adUnit: this,
                        type: errorEvt,
                    });
                },
                [adImpression]: () => {
                    // NOTE: some ads forget to trigger the adVideoStart event. :(
                    if (!this[_private].videoStart) {
                        this[_private].handleVpaidEvt(adVideoStart);
                    }

                    this.emit(impression, {
                        adUnit: this,
                        type: impression,
                    });
                },
                [adPaused]: () => {
                    this[_private].paused = true;
                    this.emit(pause, {
                        adUnit: this,
                        type: pause,
                    });
                },
                [adPlaying]: () => {
                    this[_private].paused = false;
                    this.emit(resume, {
                        adUnit: this,
                        type: resume,
                    });
                },
                [adRemainingTimeChange]: () => {
                    this.emit(adProgress, {
                        adUnit: this,
                        type: adProgress,
                    });
                },
                [adSkipped]: () => {
                    this.cancel();
                    this.emit(skip, {
                        adUnit: this,
                        type: skip,
                    });
                },
                [adStarted]: () => {
                    this.emit(creativeView, {
                        adUnit: this,
                        type: creativeView,
                    });
                },
                [adStopped]: () => {
                    this.emit(adStopped, {
                        adUnit: this,
                        type: adStopped,
                    });

                    this[_protected].finish();
                },
                [adUserAcceptInvitation]: () => {
                    this.emit(acceptInvitation, {
                        adUnit: this,
                        type: acceptInvitation,
                    });
                },
                [adUserClose]: () => {
                    this.emit(closeLinear, {
                        adUnit: this,
                        type: closeLinear,
                    });

                    this[_protected].finish();
                },
                [adUserMinimize]: () => {
                    this.emit(adCollapse, {
                        adUnit: this,
                        type: adCollapse,
                    });
                },
                [adVideoComplete]: () => {
                    this.emit(complete, {
                        adUnit: this,
                        type: complete,
                    });

                    this[_protected].finish();
                },
                [adVideoFirstQuartile]: () => {
                    this.emit(firstQuartile, {
                        adUnit: this,
                        type: firstQuartile,
                    });
                },
                [adVideoMidpoint]: () => {
                    this.emit(midpoint, {
                        adUnit: this,
                        type: midpoint,
                    });
                },
                [adVideoStart]: () => {
                    if (!this[_private].videoStart) {
                        this[_private].videoStart = true;
                        this[_private].paused = false;
                        this.emit(start, {
                            adUnit: this,
                            type: start,
                        });
                    }
                },
                [adVideoThirdQuartile]: () => {
                    this.emit(thirdQuartile, {
                        adUnit: this,
                        type: thirdQuartile,
                    });
                },
                [adVolumeChange]: () => {
                    const volume = this.getVolume();

                    this.emit(volumeChanged, {
                        adUnit: this,
                        type: volumeChanged,
                    });

                    if (volume === 0 && !this[_private].muted) {
                        this[_private].muted = true;
                        this.emit(mute, {
                            adUnit: this,
                            type: mute,
                        });
                    }

                    if (volume > 0 && this[_private].muted) {
                        this[_private].muted = false;
                        this.emit(unmute, {
                            adUnit: this,
                            type: unmute,
                        });
                    }
                },
            },
            handleVpaidEvt: (event, ...args) => {
                const handler = this[_private].evtHandler[event];

                if (handler) {
                    handler(...args);
                }

                this.emit(event, {
                    adUnit: this,
                    type: event,
                });
            },
            muted: false,
            paused: true,
        };

        this[_private].loadCreativePromise = loadCreative(vastChain, videoAdContainer);
    }

    /**
     * Starts the ad unit.
     *
     * @throws if called twice.
     * @throws if ad unit is finished.
     */
    async start() {
        this[_protected].throwIfFinished();

        if (this.isStarted()) {
            throw new Error("VpaidAdUnit already started");
        }

        try {
            this.creativeAd = await this[_private].loadCreativePromise;
            const adLoadedPromise = waitFor(this.creativeAd, adLoaded);

            for (const creativeEvt of VPAID_EVENTS) {
                this.creativeAd.subscribe(this[_private].handleVpaidEvt.bind(this, creativeEvt), creativeEvt);
            }

            if (this.creativeAd[getAdIcons] && !this.creativeAd[getAdIcons]()) {
                this.icons = null;
            }

            handshake(this.creativeAd, "2.0");
            initAd(this.creativeAd, this.videoAdContainer, this.vastChain);

            await adLoadedPromise;

            // if the ad timed out while trying to load the videoAdContainer will be destroyed
            if (!this.videoAdContainer.isDestroyed()) {
                try {
                    const { videoElement } = this.videoAdContainer;

                    if (videoElement.muted) {
                        this[_private].muted = true;
                        this.setVolume(0);
                    } else {
                        this.setVolume(videoElement.volume);
                    }

                    await callAndWait(this.creativeAd, startAd, adStarted);

                    if (this.icons) {
                        const drawIcons = async () => {
                            if (this.isFinished()) {
                                return;
                            }

                            await this[_protected].drawIcons();

                            if (this[_protected].hasPendingIconRedraws() && !this.isFinished()) {
                                setTimeout(drawIcons, 500);
                            }
                        };

                        await drawIcons();
                    }

                    this[_protected].started = true;
                } catch (error) {
                    this.cancel();
                }
            }

            return this;
        } catch (error) {
            this[_private].handleVpaidEvt(adError, error);
            throw error;
        }
    }

    /**
     * Resumes a previously paused ad unit.
     *
     * @throws if ad unit is not started.
     * @throws if ad unit is finished.
     */
    resume() {
        this.creativeAd[resumeAd]();
    }

    /**
     * Pauses the ad unit.
     *
     * @throws if ad unit is not started.
     * @throws if ad unit is finished.
     */
    pause() {
        this.creativeAd[pauseAd]();
    }

    /**
     * Skip the ad unit.
     *
     * @throws if ad unit is not started.
     * @throws if ad unit is finished.
     */
    skip() {
        this.creativeAd[skipAd]();
    }

    /**
     * Returns true if the ad is paused and false otherwise
     */
    paused() {
        return this.isFinished() || this[_private].paused;
    }

    /**
     * Sets the volume of the ad unit.
     *
     * @throws if ad unit is not started.
     * @throws if ad unit is finished.
     *
     * @param {number} volume - must be a value between 0 and 1;
     */
    setVolume(volume) {
        this.creativeAd[setAdVolume](volume);
    }

    /**
     * Gets the volume of the ad unit.
     *
     * @throws if ad unit is not started.
     * @throws if ad unit is finished.
     *
     * @returns {number} - the volume of the ad unit.
     */
    getVolume() {
        return this.creativeAd[getAdVolume]();
    }

    /**
     * Cancels the ad unit.
     *
     * @throws if ad unit is finished.
     */
    async cancel() {
        this[_protected].throwIfFinished();

        try {
            const adStoppedPromise = waitFor(this.creativeAd, adStopped, 3000);

            this.creativeAd[stopAd]();
            await adStoppedPromise;
        } catch (error) {
            this[_protected].finish();
        }
    }

    /**
     * Returns the duration of the ad Creative or 0 if there is no creative.
     *
     * Note: if the user has engaged with the ad, the duration becomes unknown and it will return 0;
     *
     * @returns {number} - the duration of the ad unit.
     */
    duration() {
        if (!this.creativeAd) {
            return 0;
        }

        const duration = this.creativeAd[getAdDuration]();

        if (duration < 0) {
            return 0;
        }

        return duration;
    }

    /**
     * Returns the current time of the ad Creative or 0 if there is no creative.
     *
     * Note: if the user has engaged with the ad, the currentTime becomes unknown and it will return 0;
     *
     * @returns {number} - the current time of the ad unit.
     */
    currentTime() {
        if (!this.creativeAd) {
            return 0;
        }

        const remainingTime = this.creativeAd[getAdRemainingTime]();

        if (remainingTime < 0) {
            return 0;
        }

        return this.duration() - remainingTime;
    }

    /**
     * This method resizes the ad unit to fit the available space in the passed {@link VideoAdContainer}
     *
     * @throws if ad unit is not started.
     * @throws if ad unit is finished.
     *
     * @returns {Promise} - that resolves once the unit was resized
     */
    async resize(width, height, viewmode) {
        await super.resize(width, height, viewmode);

        return callAndWait(this.creativeAd, resizeAd, adSizeChange, width, height, viewmode);
    }
}

export default VpaidAdUnit;
