document.addEventListener("DOMContentLoaded", function () {
    window.SberDevicesAdSDK.initWithParams({
        params: {
            sub: "EA7583CD-A667-48BC-B806-42ECB2B48606",
            projectName: "project",
            device: {
                surface: "fdfd4a3007f847af8f9d2d7e26ea3405",
                deviceId: "3C80B248A775CA10",
            },
            app_info: {
                projectId: "21483b36f69611eb9a030242ac130003",
                applicationId: "21483b36f69611eb9a030242ac130003",
            },
        },
        onError: (err) => console.log(err),
    });
    const button = document.getElementById("open-banner");
    button.addEventListener("click", () => {
        window.SberDevicesAdSDK.runBanner({
            onSuccess,
            onError,
            onAdReady,
        });
    });
});

function onSuccess(...args) {
    console.log("onSuccess", ...args);
}
function onError(...args) {
    console.log("onError", ...args);
}
function onAdReady(...args) {
    console.log("onAdReady", ...args);
}
