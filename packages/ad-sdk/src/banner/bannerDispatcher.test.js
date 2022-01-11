import { openBanner } from "./bannerDispatcher";
import { Banner } from "./banner";
import { injectCss } from "../utils/injectCss";
jest.mock("./banner");
jest.mock("../utils/injectCss");
jest.useFakeTimers();

const stylesElementId = "pasma-ad-banner-styles";

describe("bannerDispatcher.js - openBanner function", () => {
    let bannerRunSpy;
    let injectCssSpy;
    let triggerEvent;

    beforeEach(() => {
        document.body.innerHTML = "";
        bannerRunSpy = jest.fn();
        injectCssSpy = jest.fn();
        triggerEvent = jest.fn();
        Banner.mockImplementation(() => {
            return {
                run: bannerRunSpy,
            };
        });
        injectCss.mockImplementation(injectCssSpy);

        const styleElement = document.getElementById(stylesElementId);
        if (styleElement) {
            styleElement.parentNode.removeChild(styleElement);
        }
    });

    afterEach(() => {
        jest.runAllTimers();
        jest.clearAllTimers();
    });

    test("Баннер открывается", () => {
        const container = document.createElement("div");
        container.id = "container";
        openBanner({ container, params: {}, cooldownTime: 2 * 60 * 1000, triggerEvent });
        expect(bannerRunSpy).toHaveBeenCalledTimes(1);
    });

    test("Ошибка при открытии если баннер уже открыт", () => {
        const container = document.createElement("div");
        container.id = "container";
        const onErrorSpy = jest.fn();
        openBanner({
            container,
            params: {},
            cooldownTime: 2 * 60 * 1000,
            events: { onError: onErrorSpy },
            triggerEvent,
        });
        openBanner({
            container,
            params: {},
            cooldownTime: 2 * 60 * 1000,
            events: { onError: onErrorSpy },
            triggerEvent,
        });
        expect(onErrorSpy).toHaveBeenCalledTimes(1);
    });

    test("Ошибка при открытии баннера если кулдаун еще не закончился", () => {
        const container = document.createElement("div");
        container.id = "container";
        const onErrorSpy = jest.fn();
        openBanner({
            container,
            params: {},
            cooldownTime: 2 * 60 * 1000,
            events: { onError: onErrorSpy },
            triggerEvent,
        });

        jest.advanceTimersByTime(10 * 1000);

        openBanner({
            container,
            params: {},
            cooldownTime: 2 * 60 * 1000,
            events: { onError: onErrorSpy },
            triggerEvent,
        });
        expect(onErrorSpy).toHaveBeenCalledTimes(1);
    });

    test('Если куллдаун не закончился, при попытке открыть баннер сохраняется событие "errorOpenBeforeCooldown" и все события сохраняются', () => {
        const container = document.createElement("div");
        container.id = "container";
        const onErrorSpy = jest.fn();
        openBanner({
            container,
            params: {},
            cooldownTime: 2 * 60 * 1000,
            events: { onError: onErrorSpy },
            triggerEvent: jest.fn(),
        });

        jest.advanceTimersByTime(10 * 1000);

        openBanner({
            container,
            params: {},
            cooldownTime: 2 * 60 * 1000,
            events: { onError: onErrorSpy },
            triggerEvent,
        });

        expect(triggerEvent).toBeCalledWith("errorOpenBeforeCooldown");
    });

    test("Баннер возможно открыть еще раз если кулдаун закончился", () => {
        const container = document.createElement("div");
        container.id = "container";
        const onErrorSpy = jest.fn();
        openBanner({
            container,
            params: {},
            cooldownTime: 2 * 60 * 1000,
            events: { onError: onErrorSpy },
            triggerEvent,
        });

        jest.advanceTimersByTime(2 * 60 * 1000);

        openBanner({
            container,
            params: {},
            cooldownTime: 2 * 60 * 1000,
            events: { onError: onErrorSpy },
            triggerEvent,
        });
        expect(bannerRunSpy).toHaveBeenCalledTimes(2);
    });

    test("Стили добавляются в head", () => {
        const container = document.createElement("div");
        container.id = "container";
        openBanner({ container, params: {}, cooldownTime: 2 * 60 * 1000, triggerEvent });
        expect(injectCssSpy).toHaveBeenCalledTimes(1);
    });
});
