const { createAssistant, createSmartappDebugger } = window.assistant;

const { initWithAssistant, runVideoAd } = window.SberDevicesAdSDK;

const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
const DEV_TOKEN = process.env.DEV_TOKEN;
const DEV_PHRASE = process.env.DEV_PHRASE;

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

document.addEventListener("DOMContentLoaded", () => {
    const testBtn = document.querySelector(".btn");
    testBtn.disabled = true;

    const onError = (err) => {
        console.error("AdSDK Error", err);
    };
    const assistant = initializeAssistant();

    initWithAssistant({
        assistant,
        onSuccess: () => {
            console.log("AdSdk Inited with assistant");
            testBtn.disabled = false;
        },
        onError,
    });

    let i = 1;
    const text = testBtn.textContent;

    testBtn.addEventListener("click", () => {
        runVideoAd({
            onSuccess: () => {
                console.log("Success");
                testBtn.textContent = text + ": watched " + i++;
            },
            onError,
        });
    });

    const ratingsBtn = document.getElementById("show-ratings");
    ratingsBtn.addEventListener("click", () => {
        assistant.sendAction("SHOW_RATING_SUGGEST");
    });
});
