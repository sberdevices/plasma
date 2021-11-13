/* eslint-disable promise/prefer-await-to-callbacks, callback-return */
import { trackError } from "../tracker";
import requestAd from "../vastRequest/requestAd";
import requestNextAd from "../vastRequest/requestNextAd";
import { getInteractiveFiles } from "../vastSelectors";
import isIOS from "../utils/isIOS";
import run from "./run";

const isVpaid = (vastChain) => Boolean(getInteractiveFiles(vastChain[0].ad));
const validateVastChain = (vastChain, options) => {
    if (!vastChain || vastChain.length === 0) {
        throw new Error("Invalid VastChain");
    }

    const lastVastResponse = vastChain[0];

    if (!options.vpaidEnabled && isVpaid(vastChain)) {
        const error = new Error("VPAID ads are not supported by the current player");

        error.code = 200;
        lastVastResponse.errorCode = 200;
        lastVastResponse.error = error;
    }

    if (Boolean(lastVastResponse.error)) {
        throw lastVastResponse.error;
    }

    if (options.hooks && typeof options.hooks.validateVastResponse === "function") {
        options.hooks.validateVastResponse(vastChain);
    }
};

const callbackHandler = (cb) => (...args) => {
    if (typeof cb === "function") {
        cb(...args);
    }
};

const getErrorCode = (vastChain, error) => (vastChain && vastChain[0] && vastChain[0].errorCode) || error.code;
const transformVastResponse = (vastChain, { hooks }) => {
    if (hooks && typeof hooks.transformVastResponse === "function") {
        return hooks.transformVastResponse(vastChain);
    }

    return vastChain;
};

// eslint-disable-next-line complexity
const waterfall = async (fetchVastChain, placeholder, options, isCanceled) => {
    let vastChain;
    let runEpoch;
    let adUnit;
    const opts = { ...options };
    const { onAdStart, onError, onRunFinish } = opts;

    try {
        if (typeof opts.timeout === "number") {
            runEpoch = Date.now();
        }

        vastChain = await fetchVastChain();

        if (isCanceled()) {
            onRunFinish();

            return;
        }

        if (runEpoch) {
            const newEpoch = Date.now();

            opts.timeout -= newEpoch - runEpoch;
            runEpoch = newEpoch;
        }

        validateVastChain(vastChain, opts);

        adUnit = await run(transformVastResponse(vastChain, opts), placeholder, { ...opts });

        if (isCanceled()) {
            adUnit.cancel();
            onRunFinish();

            return;
        }

        adUnit.onError(onError);
        adUnit.onFinish(onRunFinish);
        onAdStart(adUnit);
    } catch (error) {
        const errorCode = getErrorCode(vastChain, error);

        if (Boolean(errorCode)) {
            const { tracker } = options;

            trackError(vastChain, {
                errorCode,
                tracker,
            });
        }

        onError(error, {
            adUnit,
            vastChain,
        });

        if (vastChain && !isCanceled()) {
            if (runEpoch) {
                opts.timeout -= Date.now() - runEpoch;
            }

            if (!runEpoch || opts.timeout > 0) {
                waterfall(() => requestNextAd(vastChain, opts), placeholder, { ...opts }, isCanceled);

                return;
            }
        }

        onRunFinish();
    }
};

/**
 * Will try to start one of the ads returned by the `adTag`. It will keep trying until it times out or it runs out of ads.
 *
 * @memberof module:video-ad-sdk
 * @static
 * @alias runWaterfall
 * @param {string} adTag - The VAST ad tag request url.
 * @param {HTMLElement} placeholder - placeholder element that will contain the video ad.
 * @param {Object} [options] - Options Map. The allowed properties are:
 * @param {HTMLVideoElement} [options.videoElement] - optional videoElement that will be used to play the ad.
 * @param {Console} [options.logger] - Optional logger instance. Must comply to the [Console interface]{@link https://developer.mozilla.org/es/docs/Web/API/Console}.
 * Defaults to `window.console`
 * @param {number} [options.wrapperLimit] - Sets the maximum number of wrappers allowed in the {@link VastChain}.
 *  Defaults to `5`.
 * @param {runWaterfall~onAdReady} [options.onAdReady] - will be called once the ad is ready with the ad unit.
 * @param {runWaterfall~onAdStart} [options.onAdStart] - will be called once the ad starts with the ad unit.
 * @param {runWaterfall~onError} [options.onError] - will be called if there is an error with the video ad with the error instance and an obj with the {@link VastChain} and the ad unit if it exists.
 * @param {runWaterfall~onRunFinish} [options.onRunFinish] - will be called whenever the ad run finishes.
 * @param {boolean} [options.viewability] - if true it will pause the ad whenever is not visible for the viewer.
 * Defaults to `false`
 * @param {boolean} [options.responsive] - if true it will resize the ad unit whenever the ad container changes sizes.
 * Defaults to `false`
 * @param {number} [options.timeout] - timeout number in milliseconds. If set, the video ad will time out if it doesn't start within the specified time.
 * @param {TrackerFn} [options.tracker] - If provided it will be used to track the VAST events instead of the default {@link pixelTracker}.
 * @param {boolean} [options.vpaidEnabled] - if false and it gets a VPAID ad, it will throw an error before starting the ad and continue down in the waterfall.
 * Defaults to `true`.
 * @param {Object} [options.hooks] - Optional map with hooks to configure the behaviour of the ad.
 * @param {Function} [options.hooks.createSkipControl] - If provided it will be called to generate the skip control. Must return a clickable [HTMLElement](https://developer.mozilla.org/es/docs/Web/API/HTMLElement) that is detached from the DOM.
 * @param {Function} [options.hooks.getMediaFile] - If provided it will be called to get a {@link MediaFile} by size of the current video element.
 * @param {Function} [options.hooks.validateVastResponse] - If provided it will be called passing the current {@link VastChain} for each valid vast response. Must throw if there is a problem with the vast response. If the Error instance has an `code` number then it will be tracked using the error macros in the Vast response. It will also call {@link runWaterfall~onError} with the thrown error.
 * @param {Function} [options.hooks.transformVastResponse] - If provided it will be called with the current {@link VastChain} before building the adUnit allowing the modification of the vastResponse if needed.
 * @returns {Function} - Cancel function. If called it will cancel the ad run. {@link runWaterfall~onRunFinish} will still be called;
 */
const runWaterfall = (adTag, placeholder, options) => {
    let canceled = false;
    let adUnit = null;
    const isCanceled = () => canceled;
    const onAdStartHandler = callbackHandler(options.onAdStart);
    const onAdStart = (newAdUnit) => {
        adUnit = newAdUnit;
        onAdStartHandler(adUnit);
    };

    const opts = {
        vpaidEnabled: true,
        ...options,
        // eslint-disable-next-line sort-keys
        onAdReady: callbackHandler(options.onAdReady),
        onAdStart,
        onError: callbackHandler(options.onError),
        onRunFinish: callbackHandler(options.onRunFinish),
    };

    if (options.videoElement && options.videoElement.paused && isIOS()) {
        /*
      It seems that if the video doesn't load synchronously inside a touchend or click event handler, the user gesture breaks on iOS and it won't allow a play.
    */
        options.videoElement.load();
    }

    waterfall(() => requestAd(adTag, opts), placeholder, opts, isCanceled);

    return () => {
        canceled = true;

        if (adUnit && !adUnit.isFinished()) {
            adUnit.cancel();
        }
    };
};

export default runWaterfall;

/**
 * Called once the ad starts.
 *
 * @callback RunWaterfall~onAdStart
 * @param {VastAdUnit | VideoAdUnit} adUnit - the ad unit instance.
 */

/**
 * Called once the ad unit is created.
 *
 * @callback RunWaterfall~onAdReady
 * @param {VastAdUnit | VideoAdUnit} adUnit - the ad unit instance.
 */

/**
 * Called whenever the an error occurs within the ad unit. It may be called several times with different errors
 *
 * @callback RunWaterfall~onError
 * @param {Error} error - the ad unit error.
 * @param {Object} [data] - Data object that will contain:
 * @param {VastChain} [data.vastChain] - The {@link VastChain} that caused the error.
 * @param {VideoAdUnit} [data.adUnit] - Ad unit instance it can be a {@link VastAdUnit} or a {@link VpaidAdUnit}. Will only be added if the vastChain had an ad.
 */

/**
 * Called once the ad run is finished. It will be called no matter how the run was finished (due to an ad complete or an error). It can be used to know when to unmount the component.
 *
 * @callback RunWaterfall~onRunFinish
 */
