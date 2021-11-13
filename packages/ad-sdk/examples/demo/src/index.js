const { init, initDev, runVideoAd, runBanner } = window.SberDevicesAdSDK;

const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
const DEV_TOKEN = process.env.DEV_TOKEN;
const DEV_PHRASE = process.env.DEV_PHRASE;

document.addEventListener("DOMContentLoaded", () => {
    const testBtn = document.querySelector(".video-ad-btn");
    testBtn.disabled = true;

    const onSuccess = () => {
        console.log("AdSdk Inited");
        testBtn.disabled = false;
    };
    const onError = (err) => {
        console.error("AdSDK Error", err);
    };

    if (IS_DEVELOPMENT) {
        initDev({ token: DEV_TOKEN, initPhrase: DEV_PHRASE, onSuccess, onError });
    } else {
        init({ onSuccess, onError });
    }

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
            onError,
        });
    });

    initBannerButton();
});

function initBannerButton() {
    const testBtn = document.querySelector(".banner-ad-btn");

    testBtn.addEventListener("click", () => {
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
