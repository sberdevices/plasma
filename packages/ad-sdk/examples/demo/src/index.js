const { init, initDev, runVideoAd, runBanner, _getVideoIds, _getBannerIds } = window.SberDevicesAdSDK;

const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
const DEV_TOKEN = process.env.DEV_TOKEN;
const DEV_PHRASE = process.env.DEV_PHRASE;
const TEST_SURFACE = process.env.TEST_SURFACE;

function getTestQueryParam() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("test");
}

function getIsTest() {
    const isEnvTest = typeof TEST_SURFACE === "boolean" ? TEST_SURFACE : true;
    const isQueryParamTest = getTestQueryParam();
    if (isQueryParamTest === "true") {
        return true;
    }
    if (isQueryParamTest === "false") {
        return false;
    }
    return isEnvTest;
}

function hideLoadingModal() {
    document.getElementsByClassName("loading-wrapper")[0].style.display = "none";
}

function showLoadingModal() {
    document.getElementsByClassName("loading-wrapper")[0].style.display = "flex";
}

function initAssistant() {
    showLoadingModal();
    const testBtn = document.querySelector(".video-ad-btn");
    const bannerBtn = document.querySelector(".banner-ad-btn");
    testBtn.disabled = true;
    bannerBtn.disabled = true;
    const isTest = getIsTest();

    const onSuccess = () => {
        console.log("AdSdk Inited");
        testBtn.disabled = false;
        bannerBtn.disabled = false;
        showAdIds();
        hideLoadingModal();
    };
    const onError = (err) => {
        hideLoadingModal();
        console.error("AdSDK Error", err);
    };
    if (IS_DEVELOPMENT) {
        initDev({ token: DEV_TOKEN, initPhrase: DEV_PHRASE, onSuccess, onError, test: isTest });
    } else {
        init({ onSuccess, onError, test: isTest });
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
            onError: () => {
                console.error("AdSDK Error", err);
            },
        });
    });

    initBannerButton();
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

function showAdIds() {
    const videoIds = _getVideoIds();
    const bannerIds = _getBannerIds();

    document.getElementById("video-pad-id-value").innerHTML = videoIds.padId;
    document.getElementById("video-block-id-value").innerHTML = videoIds.blockId;

    document.getElementById("banner-pad-id-value").innerHTML = bannerIds.padId;
    document.getElementById("banner-block-id-value").innerHTML = bannerIds.blockId;

    document.getElementById("surface-id").innerHTML = bannerIds.surface;
}
