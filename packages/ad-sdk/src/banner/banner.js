import fetch from "../utils/fetch";
import { createBanner, createPreloader } from "./bannerComponent";

const TIME_TO_AUTO_CLOSE_IN_SECONDS = 10;

export class Banner {
    timeToClose = TIME_TO_AUTO_CLOSE_IN_SECONDS;
    autoCloseInterval = null;
    preloaderElement = null;
    _timerElement = null;

    constructor(container, events = {}, params) {
        this.container = container;
        this.onSuccess = events.onSuccess || (() => {});
        this.onError = events.onError || (() => {});
        this.onAdReady = events.onAdReady || (() => {});
        this.params = params;
    }

    async run() {
        this._showPreloader();
        try {
            const { source, height, width } = await this._requestBanner();

            const banner = createBanner({
                iframeUrl: source,
                width,
                height,
                timerId: "plasma-ad-time-to-close",
                autoCloseTime: TIME_TO_AUTO_CLOSE_IN_SECONDS,
                onLoadIframe: () => {
                    this._showBanner(banner);
                    this._startAutoCloseTimer(banner);
                    this._hidePreloader();
                    this.onAdReady();
                },
                onClickCloseButton: () => {
                    this._closeAdSuccess();
                },
            });

            this.container.appendChild(banner);

            document.body.append(this.container);
        } catch (err) {
            this._closeAdError();
            this._hidePreloader();
        }
    }

    _showBanner(banner) {
        banner.style.display = "flex";
    }

    _showPreloader() {
        this.preloaderElement = createPreloader({ id: "plasma-ad-preloader" });
        this.container.appendChild(this.preloaderElement);
    }

    _hidePreloader() {
        this.preloaderElement.remove();
    }

    _closeAdSuccess() {
        this.container.remove();
        this.onSuccess();
        clearInterval(this.autoCloseInterval);
    }

    _closeAdError() {
        this.container.remove();
        this.onError();
        clearInterval(this.autoCloseInterval);
    }

    _getTimerElement() {
        if (!this._timerElement) {
            this._timerElement = document.getElementById("plasma-ad-time-to-close");
        }
        return this._timerElement;
    }

    _startAutoCloseTimer() {
        const timer = this._getTimerElement();
        this.autoCloseInterval = setInterval(() => {
            this.timeToClose--;
            if (this.timeToClose < 1) {
                clearInterval(this.autoCloseInterval);
                this._closeAdSuccess();
                return;
            }
            timer.innerText = `${this.timeToClose}`;
        }, 1000);
    }

    async _requestBanner() {
        const url = "https://ssp.rambler.ru/sberdevapp.jsp?" + new URLSearchParams(this.params);
        const response = await fetch(url);
        const adData = await response.json();
        if (!adData.source || !adData.height || !adData.width) {
            throw new Error("Некорректный ответ сервера");
        }
        return {
            source: adData.source,
            height: adData.height,
            width: adData.width,
        };
    }
}
