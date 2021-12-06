import { runWaterfall } from "./ad-sdk/index";
import { openBanner } from "./banner";
import { getBannerBlockId, getVideoBlockId } from "./utils/blockId";
import { getBannerPadId, getVideoPadId } from "./utils/padId";

const logger = {
    // TODO: clickhouse logger
    // log: () => {},
    log: console.log.bind(console),
    // error: () => {},
    error: (err) => console.error(err),
};

let initParams = {};

let cooldownTime = 2 * 60 * 1000;

let _inited = false;
let adTag = "";

function createContainer() {
    const adContainer = document.createElement("div");

    adContainer.style.position = "fixed";
    adContainer.style.top = "0";
    adContainer.style.left = "0";
    adContainer.style.width = "100%";
    adContainer.style.height = "100%";
    adContainer.style.zIndex = "1000000000";
    adContainer.style.background = "#000";
    adContainer.id = "plasma-ad";
    return adContainer;
}

function _initWithParams(params = {}, test) {
    const errParam = (param) => {
        throw new Error("init params: " + param + " is not defined");
    };

    if (typeof params.sub !== "string") {
        errParam("sub");
    }

    initParams = {
        projectName: params.projectName,
        sub: params.sub,
    };

    if (!params.device) {
        errParam("device");
    }

    if (!params.device.surface) {
        errParam("device.surface");
    }

    if (test) {
        params.device.surface = "TEST";
    }

    if (typeof params.device.deviceId !== "string") {
        errParam("device.deviceId");
    }

    initParams = Object.assign(initParams, params.device);

    if (!params.app_info) {
        errParam("app_info");
    }

    if (typeof params.app_info.projectId !== "string") {
        errParam("app_info.projectId");
    }

    if (typeof params.app_info.applicationId !== "string") {
        errParam("app_info.applicationId");
    }

    initParams = Object.assign(initParams, params.app_info);

    _inited = true;
    adTag = buildAdTag();
}

function _initWithAssistant(assistant, onSuccess, onError, test) {
    assistant.on("data", (command) => {
        if (_inited) {
            return;
        }

        if (command.type === "smart_app_data" && command.smart_app_data.type === "sub") {
            try {
                _initWithParams(command.smart_app_data.payload, test);
                onSuccess();
            } catch (error) {
                logger.log(error);
                onError(error);
            }
        } else if (command.type === "smart_app_error") {
            const error = command.smart_app_error;
            logger.log(error);
            onError(error);
        }
    });
}

export function isInited() {
    return _inited;
}

// 1) Init with Params
//
// const a = createAssistant({...});
// a.on('data', (command) => if (command.type === 'smart_app_data' && command.smart_app_data.type === 'sub') {
//     initWithParams({ params: command.smart_app_data.payload });
// })

// 2) Init with Assistant
// const a = createAssistant({ ... });
// initWithAssistant({ assistant: a, onSuccess, onError });

// 3) Init with phrase & token
// initDev({ token, initPhrase, onSuccess, onError })  // DEV
// init({ onSuccess, onError }); // PROD

const _assistantState = {};

export function init(params = {}) {
    const test = !!params.test;
    const onSuccess = params.onSuccess || (params.onSuccess = () => {});
    const onError = params.onError || (params.onError = () => {});

    if (typeof window === "undefined" || typeof window.assistant === "undefined") {
        onError(Error("window.assistant is not defined"));
        return;
    }

    try {
        const assistant = window.assistant.createAssistant({
            getState: () => _assistantState,
        });
        initWithAssistant({ assistant, onSuccess, onError, test }, test);
    } catch (err) {
        onError(Error("createAssistant failed"));
    }
}

export function initDev(params = {}) {
    const test = !!params.test;
    const onSuccess = params.onSuccess || (params.onSuccess = () => {});
    const onError = params.onError || (params.onError = () => {});

    if (typeof params.token !== "string") {
        onError(Error("token is not defined"));
        return;
    }

    if (typeof params.initPhrase !== "string") {
        onError(Error("initPhrase is not defined"));
        return;
    }

    const { token, initPhrase } = params;

    if (typeof window === "undefined" || typeof window.assistant === "undefined") {
        onError(Error("window.assistant is not defined"));
        return;
    }

    try {
        const assistant = window.assistant.createSmartappDebugger({
            token,
            initPhrase,
            getState: () => _assistantState,
        });
        initWithAssistant({ assistant, onSuccess, onError }, test);
    } catch (err) {
        onError(Error("createAssistant failed"));
    }
}

export function initWithParams(params = {}, test = false) {
    const onSuccess = params.onSuccess || (params.onSuccess = () => {});
    const onError = params.onError || (params.onError = () => {});

    if (typeof params.params !== "object") {
        onError(Error("params is not defined"));
        return;
    }

    try {
        _initWithParams(params.params, test);
        onSuccess();
    } catch (err) {
        onError(err);
    }
}

export function initWithAssistant(params = {}, test = false) {
    const onSuccess = params.onSuccess || (params.onSuccess = () => {});
    const onError = params.onError || (params.onError = () => {});

    if (!params.assistant) {
        onError(Error("provide assistant"));
        return;
    }

    const assistant = params.assistant;

    if (
        typeof assistant.getInitialData !== "function" ||
        typeof assistant.getRecoveryState !== "function" ||
        typeof assistant.on !== "function"
    ) {
        onError(Error("assistant is not AssistantClient"));
        return;
    }

    _initWithAssistant(assistant, onSuccess, onError, test);
}

const buildAdTag = () => {
    const surface = initParams.surface;
    const projectId = initParams.projectId;
    const appId = initParams.applicationId;

    let base = "https://ssp.rambler.ru/vapirs";

    base += "?wl=rambler";
    base += `&pad_id=${getVideoPadId(surface)}`;
    base += `&block_id=${getVideoBlockId(surface)}`;

    const jParams = {
        puid34: "",
        puid35: "",
        puid36: "",
        puid7: "",
        puid6: "SBER",
        puid18: "SBER_SBER",
        eid1: projectId + ":" + appId,
        eid2: surface,
        puid8: "",
    };
    base += "&jparams=" + encodeURIComponent(JSON.stringify(jParams, null, 0));

    const deviceId = initParams.deviceId;
    const sub = initParams.sub;

    const externalIds = {
        device_id: deviceId,
        user_id: sub,
    };
    base += "&external_ids=" + encodeURIComponent(JSON.stringify(externalIds, null, 0));

    base += "&url=" + encodeURIComponent(document.location.href);

    return base;
};

export function runVideoAd(params = {}) {
    params.onSuccess || (params.onSuccess = () => {});
    params.onError || (params.onError = () => {});
    params.onAdReady || (params.onAdReady = () => {});

    if (!_inited) {
        params.onError(Error("Module is not inited, try to run init() first"));
        return;
    }

    const muted = params.mute || false;

    const adContainer = document.createElement("div");
    let adUnit;

    const onAdReady = (newAdUnit) => {
        try {
            adUnit = newAdUnit;

            // focus clickThrough link for SberBox
            const clickThrough = adUnit.videoAdContainer.element.querySelectorAll("a")[0];
            clickThrough.focus();

            // loader for Android awfull default poster
            adUnit.videoAdContainer.videoElement.poster =
                "data:image/gif;base64,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";

            // for ios player – no fullScreen
            adUnit.videoAdContainer.videoElement.playsInline = true;

            adUnit.on("clickThrough", () => {
                adUnit.videoAdContainer.videoElement.pause();
                adUnit.videoAdContainer.element.remove();
                document.body.removeChild(adContainer);
                params.onSuccess();
            });

            const logEvent = (evt) => logger.log(`### ${evt.type}`, evt.adUnit, initParams);

            [
                "pause",
                "resume",
                "finish",
                "impression",
                "start",
                "skip",
                "firstQuartile",
                "midpoint",
                "thirdQuartile",
                "complete",
            ].forEach((evtType) => {
                adUnit.on(evtType, logEvent);
            });

            params.onAdReady();
        } catch (err) {
            document.body.removeChild(adContainer);
            params.onError(err);
        }
    };

    const onError = (evt) => {
        logger.log("### onError", evt);
        params.onError(Error("Something goes wrong inside player"));
    };

    const onAdStart = (evt) => {
        logger.log("### onAdStart", evt);
    };

    const onRunFinish = () => {
        document.body.removeChild(adContainer);
        logger.log("### onRunFinish");
        params.onSuccess();
    };

    adContainer.style.position = "fixed";
    adContainer.style.top = "0";
    adContainer.style.left = "0";
    adContainer.style.width = "100%";
    adContainer.style.height = "100%";
    adContainer.style.zIndex = "1000000000";
    adContainer.style.background = "#000";

    document.body.append(adContainer);

    logger.log("### adTag", adTag);

    runWaterfall(adTag, adContainer, {
        onAdReady,
        onAdStart,
        onError,
        onRunFinish,
        timeout: 15000,
        muted,
    });
}

export function runBanner(events = {}) {
    if (!_inited) {
        if (events.onError) {
            events.onError(Error("Module is not inited, try to run init() first"));
        }
        return;
    }
    try {
        const adContainer = createContainer();

        const params = getBannerParams();

        openBanner({
            container: adContainer,
            params,
            cooldownTime,
            events,
        });
    } catch (err) {
        saveError(err);
    }
}

function getBannerParams() {
    const surface = initParams.surface;
    const projectId = initParams.projectId;
    const appId = initParams.applicationId;

    const deviceId = initParams.deviceId;
    const sub = initParams.sub;

    const eid1 = projectId + ":" + appId;
    const eid2 = surface;

    const viewPortWidth = window.innerWidth;
    const viewPortHeight = window.innerHeight;

    const padId = getBannerPadId(surface);
    const blockId = getBannerBlockId(surface);

    return {
        device_type: "2",
        secure: "1",
        // os_family: 'iOS',
        // os_version: '14.6',
        // vendor: 'Apple',
        // model: 'iPad 10.2',
        winh: `${viewPortHeight}`,
        winw: `${viewPortWidth}`,
        url: document.location.href,
        pad_id: padId,
        block_id: blockId,
        jparams: `{"eid1":"${eid1}","eid2":"${eid2}"}`,
        external_ids: `{"device_id": "${deviceId}","user_id":"${sub}"}`,
    };
}

export function _getBannerIds() {
    if (!_inited) {
        params.onError(Error("Module is not inited, try to run init() first"));
        return;
    }
    const surface = initParams.surface;
    return {
        surface: initParams.surface,
        padId: getBannerPadId(surface),
        blockId: getBannerBlockId(surface),
    };
}

export function _getVideoIds() {
    if (!_inited) {
        params.onError(Error("Module is not inited, try to run init() first"));
        return;
    }
    const surface = initParams.surface;
    return {
        surface: initParams.surface,
        padId: getVideoPadId(surface),
        blockId: getVideoBlockId(surface),
    };
}

function saveError(err) {
    logger.error(err);
}

// backward compability
self.SberDevicesVideoAdSDK = {};
self.SberDevicesVideoAdSDK.init = _initWithParams;
self.SberDevicesVideoAdSDK.run = runVideoAd;
