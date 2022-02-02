import "@sberdevices/spatial-navigation/polyfill/spatial-navigation-polyfill";

const {
    init,
    initDev,
    initWithAssistant,
    initWithParams,
    runVideoAd,
    runBanner,
    _getVideoIds,
    _getBannerIds,
    getAssistantRef,
} = window.SberDevicesAdSDK;
const { createAssistant, createSmartappDebugger } = window.assistant;

const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
const DEV_TOKEN = process.env.DEV_TOKEN;
const DEV_PHRASE = process.env.DEV_PHRASE;
const TEST_SURFACE = process.env.TEST_SURFACE;
const INIT_API = process.env.INIT_API;

const initAPIName = "initAPI";
const isTestName = "test";

function getTestQueryParam() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    return {
        isTestFromQ: JSON.parse(urlParams.get(isTestName)),
        initApiFromQ: urlParams.get(initAPIName),
    };
}

function loadCookie(name) {
    const cookies = document.cookie.split("; ").reduce((acc, el) => {
        const [key, ...valParts] = el.split("=");
        acc[key] = valParts.join("=");

        return acc;
    }, {});

    return cookies[name];
}

function saveCookie(name, value, domain) {
    domain || (domain = window.location.hostname);
    document.cookie = `${name}=${value}; domain=${domain}`;

    return value;
}

function getEnvs() {
    const isEnvTest = typeof TEST_SURFACE === "boolean" ? TEST_SURFACE : true;
    const { isTestFromQ, initApiFromQ } = getTestQueryParam();

    const initAPI = initApiFromQ !== null ? saveCookie(initAPIName, initApiFromQ) : loadCookie(initAPIName);
    const isTest = isTestFromQ !== null ? isTestFromQ : isEnvTest;

    return {
        isTest,
        initAPI: initAPI || INIT_API || "init",
    };
}

function hideLoadingModal() {
    document.getElementsByClassName("loading-wrapper")[0].style.display = "none";
}

function showLoadingModal() {
    document.getElementsByClassName("loading-wrapper")[0].style.display = "flex";
}

function disabledBtns() {
    const testBtn = document.querySelector(".video-ad-btn");
    const bannerBtn = document.querySelector(".banner-ad-btn");

    testBtn.disabled = true;
    bannerBtn.disabled = true;
}

function enableBtns() {
    const testBtn = document.querySelector(".video-ad-btn");
    const bannerBtn = document.querySelector(".banner-ad-btn");

    testBtn.disabled = false;
    bannerBtn.disabled = false;
}

const assistantState = {};
const initializeAssistant = () => {
    if (!IS_DEVELOPMENT) {
        return createAssistant({
            getState: () => assistantState,
        });
    }

    if (!DEV_TOKEN || !DEV_PHRASE) {
        throw new Error("No token or phrase");
    }

    return createSmartappDebugger({
        token: DEV_TOKEN,
        initPhrase: DEV_PHRASE,
        getState: () => assistantState,
    });
};

const assistantRef = getAssistantRef();

function initAssistant() {
    showLoadingModal();
    disabledBtns();

    const { isTest, initAPI } = getEnvs();

    const onSuccess = () => {
        console.log("AdSdk Inited: ", initAPI);
        enableBtns();
        showAdIds();
        initRatingButton();
        hideLoadingModal();
    };
    const onError = (err) => {
        hideLoadingModal();
        console.error("AdSDK Error", err);
    };
    const token = DEV_TOKEN;
    const initPhrase = DEV_PHRASE;
    const cooldownTime = 0;
    const test = isTest;

    switch (initAPI) {
        case "initWithAssistant":
            {
                const assistant = initializeAssistant();
                initWithAssistant({ assistant, onSuccess, onError, test, cooldownTime });

                document.getElementById("init-api-id").innerHTML = initAPI;
            }
            break;

        case "initWithParams":
            {
                const assistant = initializeAssistant();

                assistant.on("data", (command) => {
                    if (command.type === "smart_app_data" && command.smart_app_data.type === "sub") {
                        initWithParams({
                            params: command.smart_app_data.payload,
                            onSuccess,
                            onError,
                            test,
                            cooldownTime,
                        });
                    } else if (command.type === "smart_app_error") {
                        const error = command.smart_app_error;
                        onError(error);
                    }
                });

                assistantRef.current = assistant;

                document.getElementById("init-api-id").innerHTML = initAPI;
            }
            break;

        case "init":
        default:
            if (IS_DEVELOPMENT) {
                initDev({ token, initPhrase, onSuccess, onError, test, cooldownTime });
            } else {
                init({ onSuccess, onError, test, cooldownTime });
            }

            document.getElementById("init-api-id").innerHTML = "init";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const testBtn = document.querySelector(".video-ad-btn");

    initAssistant();

    let i = 1;
    const text = testBtn.textContent;

    testBtn.addEventListener("click", () => {
        const muteVideo = document.getElementById("mute-video-ad").checked;
        runVideoAd({
            mute: muteVideo,
            onSuccess: () => {
                console.log("Success");
                testBtn.textContent = text + ": watched " + i++;
            },
            onError: (err) => {
                console.error("AdSDK Error", err);
            },
        });
    });

    initBannerButton();
    initChangeAPIButtons();
});

function initBannerButton() {
    const testBtn = document.querySelector(".banner-ad-btn");

    testBtn.addEventListener("click", (event) => {
        runBanner({
            onSuccess: () => {
                console.log("Success");
            },
            onError: (err) => {
                console.error("AdSDK Error", err);
            },
        });
    });
}

function initRatingButton() {
    const showSugsRatingBtn = document.querySelector(".show-sugs-rating-btn");
    const showRatingBtn = document.querySelector(".show-rating-btn");

    const serverActionShowSuggestRating = {
        action: {
            action_id: "SHOW_RATING_SUGGEST",
        },
    };
    const serverActionShowRating = {
        action: {
            action_id: "SHOW_RATING",
        },
    };

    const assistant = assistantRef.current;

    if (assistant) {
        showSugsRatingBtn.disabled = false;
        showSugsRatingBtn.addEventListener("click", (event) => {
            assistant.sendData(serverActionShowSuggestRating);
        });

        showRatingBtn.disabled = false;
        showRatingBtn.addEventListener("click", (event) => {
            assistant.sendData(serverActionShowRating);
        });
    }
}

function initChangeAPIButtons() {
    Array.from(document.querySelectorAll(".change-init-btn")).forEach((el) => {
        el.addEventListener("click", (event) => {
            saveCookie(initAPIName, el.innerText);
            const assistant = assistantRef.current;
            assistant && assistant.close();
        });
    });
}

function showAdIds() {
    const videoIds = _getVideoIds();
    const bannerIds = _getBannerIds();

    document.getElementById("video-pad-id-value").innerHTML = videoIds.padId;
    document.getElementById("video-block-id-value").innerHTML = videoIds.blockId;

    document.getElementById("banner-pad-id-value").innerHTML = bannerIds.padId;
    document.getElementById("banner-block-id-value").innerHTML = bannerIds.blockId;

    document.getElementById("surface-id").innerHTML = bannerIds.surface;
}
