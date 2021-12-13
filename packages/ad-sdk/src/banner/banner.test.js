import { Banner } from "./banner";
import fetch from "../utils/fetch";
jest.mock("../utils/fetch");
jest.useFakeTimers();

fetch.mockImplementation(() => {
    return Promise.resolve({ json: () => ({ source: "url", height: "100px", width: "150px" }) });
});

function waitAnimationFrame() {
    return new Promise((resolve, reject) => {
        jest.useRealTimers();
        window.requestAnimationFrame(() => {
            jest.useFakeTimers();
            resolve();
        });
    });
}

function triggerOnLoadIframe() {
    const iframe = document.getElementsByTagName("iframe")[0];
    iframe.dispatchEvent(new Event("load"));
}

function createBanner({ events } = {}) {
    const adContainer = document.createElement("div");
    adContainer.id = "root";
    const banner = new Banner(
        adContainer,
        {
            onError: (err) => console.log("error", err),
            ...events,
        },
        {}
    );
    return banner;
}

describe("banner.js - Banner class", () => {
    beforeEach(() => {
        document.body.innerHTML = "";
    });

    afterEach(() => {
        jest.runAllTimers();
        jest.clearAllTimers();
    });

    test("Совпадает снапшот", async () => {
        const banner = createBanner();
        await banner.run();
        triggerOnLoadIframe();
        const bodyElement = document.getElementsByTagName("body")[0];
        expect(bodyElement).toMatchSnapshot();
    });

    test("Отображается прелоадер перед началом загрузки банера", async () => {
        const banner = createBanner();
        await banner.run();

        const preloaderElement = document.getElementById("plasma-ad-preloader");

        expect(preloaderElement).toBeDefined();
    });

    test("Не отображается прелоадер после загрузки банера", async () => {
        const banner = createBanner();
        await banner.run();
        let preloaderElement = document.getElementById("plasma-ad-preloader");
        expect(preloaderElement).toBeDefined();
        triggerOnLoadIframe();
        preloaderElement = document.getElementById("plasma-ad-preloader");
        expect(preloaderElement).toBeFalsy();
    });

    test("После загрузки отображается iframe с правильными параметрами", async () => {
        const banner = createBanner();
        await banner.run();

        const iframe = document.getElementsByTagName("iframe")[0];

        expect(iframe).toBeTruthy();
        expect(iframe.getAttribute("src")).toBe("url");
        expect(iframe.getAttribute("height")).toBe("100px");
        expect(iframe.getAttribute("width")).toBe("150px");
    });

    test("Реклама автоматически закрывается после 10 секунд", async () => {
        const banner = createBanner();
        await banner.run();
        let rootElement = document.getElementById("root");
        expect(rootElement).toBeTruthy();

        triggerOnLoadIframe();

        jest.advanceTimersByTime(5 * 1000);

        rootElement = document.getElementById("root");
        expect(rootElement).toBeTruthy();

        jest.advanceTimersByTime(5 * 1000);

        jest.advanceTimersByTime(1000);

        rootElement = document.getElementById("root");
        expect(rootElement).toBeFalsy();
    });

    test('Реклама закрывается при нажатии на кнопку "закрыть"', async () => {
        const banner = createBanner();
        await banner.run();
        let rootElement = document.getElementById("root");
        expect(rootElement).toBeTruthy();

        triggerOnLoadIframe();

        const closeButton = document.getElementsByTagName("button")[0];
        closeButton.dispatchEvent(new Event("click"));

        jest.advanceTimersByTime(1000);

        rootElement = document.getElementById("root");
        expect(rootElement).toBeFalsy();
    });

    test("Таймер меняется корректно раз в секунду", async () => {
        const banner = createBanner();
        await banner.run();

        const timerElement = document.getElementById("plasma-ad-time-to-close");

        triggerOnLoadIframe();

        for (let i = 9; i > 0; i--) {
            jest.advanceTimersByTime(1 * 1000);
            expect(timerElement.innerText).toBe(i.toString());
        }
    });
});
