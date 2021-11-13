const { createAssistant, createSmartappDebugger } = window.assistant;

const { init, run } = window.SberDevicesVideoAdSDK;

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
        throw new Error("");
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

    const assistant = initializeAssistant();

    assistant.on("data", (command) => {
        if (command.type === "smart_app_data" && command.smart_app_data.type === "sub") {
            try {
                init(command.smart_app_data.payload);
                testBtn.disabled = false;
            } catch (err) {
                console.error(err);
            }
        }
    });

    let i = 1;
    const text = testBtn.textContent;

    testBtn.addEventListener("click", () => {
        try {
            run({
                onSuccess: () => {
                    console.log("Success");
                    testBtn.textContent = text + ": watched " + i++;
                },
                onError: (err) => {
                    console.log("Error", err);
                },
            });
        } catch (err) {
            console.error(err);
        }
    });
});
