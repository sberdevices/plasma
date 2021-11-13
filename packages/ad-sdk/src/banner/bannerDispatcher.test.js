import { openBanner } from "./bannerDispatcher";
import { Banner } from "./banner";
import { injectCss } from "../utils/injectCss";
jest.mock("./banner");
jest.mock("../utils/injectCss");
jest.useFakeTimers();

describe("bannerDispatcher.js - openBanner function", () => {
    let bannerRunSpy;
    let injectCssSpy;

    beforeEach(() => {
        document.body.innerHTML = "";
        bannerRunSpy = jest.fn();
        injectCssSpy = jest.fn();
        Banner.mockImplementation(() => {
            return {
                run: bannerRunSpy,
            };
        });
        injectCss.mockImplementation(injectCssSpy);
    });

    afterEach(() => {
        jest.runAllTimers();
        jest.clearAllTimers();
    });

    test("Баннер открывается", () => {
        const container = document.createElement("div");
        container.id = "container";
        openBanner({ container, params: {}, cooldownTime: 2 * 60 * 1000 });
        expect(bannerRunSpy).toHaveBeenCalledTimes(1);
    });

    test("Ошибка при открытии если баннер уже открыт", () => {
        const container = document.createElement("div");
        container.id = "container";
        const onErrorSpy = jest.fn();
        openBanner({ container, params: {}, cooldownTime: 2 * 60 * 1000, events: { onError: onErrorSpy } });
        openBanner({ container, params: {}, cooldownTime: 2 * 60 * 1000, events: { onError: onErrorSpy } });
        expect(onErrorSpy).toHaveBeenCalledTimes(1);
    });

    test("Ошибка при открытии баннера если кулдаун еще не закончился", () => {
        const container = document.createElement("div");
        container.id = "container";
        const onErrorSpy = jest.fn();
        openBanner({ container, params: {}, cooldownTime: 2 * 60 * 1000, events: { onError: onErrorSpy } });

        jest.advanceTimersByTime(10 * 1000);

        openBanner({ container, params: {}, cooldownTime: 2 * 60 * 1000, events: { onError: onErrorSpy } });
        expect(onErrorSpy).toHaveBeenCalledTimes(1);
    });

    test("Баннер возможно открыть еще раз если кулдаун закончился", () => {
        const container = document.createElement("div");
        container.id = "container";
        const onErrorSpy = jest.fn();
        openBanner({ container, params: {}, cooldownTime: 2 * 60 * 1000, events: { onError: onErrorSpy } });

        jest.advanceTimersByTime(2 * 60 * 1000);

        openBanner({ container, params: {}, cooldownTime: 2 * 60 * 1000, events: { onError: onErrorSpy } });
        expect(bannerRunSpy).toHaveBeenCalledTimes(2);
    });

    test("Стили добавляются в head", () => {
        const container = document.createElement("div");
        container.id = "container";
        openBanner({ container, params: {}, cooldownTime: 2 * 60 * 1000 });
        expect(injectCssSpy).toHaveBeenCalledTimes(1);
    });
});
