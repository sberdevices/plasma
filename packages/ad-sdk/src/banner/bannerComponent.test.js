import { createBanner } from "./bannerComponent";

describe("bannerComponent.js", () => {
    beforeEach(() => {
        document.body.innerHTML = "";
    });

    test("Событие клика не всплывает выше баннера", () => {
        const onLoadIframe = jest.fn();
        const onClickCloseButton = jest.fn();
        const onClickBody = jest.fn();

        const banner = createBanner({
            iframeUrl: "",
            width: "200px",
            height: "350px",
            timerId: "timer-id",
            autoCloseTime: 10000,
            onLoadIframe,
            onClickCloseButton,
        });

        document.body.addEventListener("click", onClickBody);
        document.body.append(banner);
        const closeButton = document.getElementsByTagName("button")[0];
        closeButton.dispatchEvent(new Event("click", { bubbles: true }));

        expect(onClickCloseButton).toHaveBeenCalledTimes(1);
        expect(onClickBody).toHaveBeenCalledTimes(0);
    });
});
