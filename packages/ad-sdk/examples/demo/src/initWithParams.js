const { createAssistant, createSmartappDebugger } = window.assistant;

const { initWithParams, runVideoAd } = window.SberDevicesAdSDK;

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

    assistant.on("data", (command) => {
        if (command.type === "smart_app_data" && command.smart_app_data.type === "sub") {
            initWithParams({
                params: command.smart_app_data.payload,
                onSuccess: () => {
                    console.log("AdSdk Inited with params");
                    testBtn.disabled = false;
                },
                onError,
            });
        } else if (command.type === "smart_app_error") {
            const error = command.smart_app_error;
            onError(error);
        }
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
});
