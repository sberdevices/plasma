import { createBanner } from "./bannerComponent";

describe("bannerComponent.js", () => {
    beforeEach(() => {
        document.body.innerHTML = "";
    });

    test('Для сбербокса отображается предложение надать кнопку "Назад"', () => {
        const onLoadIframe = jest.fn();
        const onClickCloseButton = jest.fn();

        const banner = createBanner({
            iframeUrl: "",
            width: "200px",
            height: "350px",
            timerId: "timer-id",
            autoCloseTime: 10000,
            onLoadIframe,
            onClickCloseButton,
            isTvRemote: true,
        });

        const backTitle = banner.getElementsByClassName("back-title")[0];
        expect(backTitle.innerText).toBe('Чтобы вернуться нажмите "назад"');
    });
});
