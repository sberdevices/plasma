import fetch from "../utils/fetch";
import { createBanner, createPreloader } from "./bannerComponent";

const TIME_TO_AUTO_CLOSE_IN_SECONDS = 10;

function blockFocusHandle(e) {
    e.preventDefault();
}

export class Banner {
    timeToClose = TIME_TO_AUTO_CLOSE_IN_SECONDS;
    autoCloseInterval = null;
    preloaderElement = null;
    _timerElement = null;
    _isTvRemote = false;
    _focusOutsideBanner = null;

    constructor(container, events = {}, sspParams, { isTvRemote } = {}) {
        this.container = container;
        this.onSuccess = events.onSuccess || (() => {});
        this.onError = events.onError || (() => {});
        this.onAdReady = events.onAdReady || (() => {});
        this.sspParams = sspParams;
        this._isTvRemote = isTvRemote;
        this._onIframeMessage = this._onIframeMessage.bind(this);
    }

    async run() {
        this._focusOutsideBanner = document.activeElement;
        history.pushState(null, null, "#plasma-ad-banner");
        this._listenOnPopState();
        this._showPreloader();

        try {
            const { source, height, width } = await this._requestBanner();

            const banner = createBanner({
                iframeUrl: source,
                width,
                height,
                timerId: "plasma-ad-time-to-close",
                autoCloseTime: TIME_TO_AUTO_CLOSE_IN_SECONDS,
                isTvRemote: this._isTvRemote,
                onLoadIframe: () => {
                    this._showBanner(banner);
                    this._hidePreloader();
                    this.onAdReady();

                    this._listenPostMessages();

                    if (this._isTvRemote) {
                        this._startAutoCloseTimer(banner);
                        this._blockFocus();
                    }
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

    _onIframeMessage(message) {
        const childWindow = document.getElementById("plasma-ad-frame").contentWindow;
        if (message.source !== childWindow) {
            return;
        }
        if (message.data && message.data.event === "close") {
            this._historyGoBack();
        }
    }

    _listenPostMessages() {
        window.addEventListener("message", this._onIframeMessage);
    }

    _removePostMessagesListeners() {
        window.removeEventListener("message", this._onIframeMessage);
    }

    _blockFocus() {
        if (this._isTvRemote) {
            const link = document.getElementById("plasma-ad-banner-link");
            link.focus();
        }
        document.addEventListener("navbeforefocus", blockFocusHandle);
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
        this.onSuccess();
        this._historyGoBack();
    }

    _closeAdError() {
        this.onError();
        this._historyGoBack();
    }

    _close() {
        if (this._focusOutsideBanner && this._focusOutsideBanner.focus) {
            this._focusOutsideBanner.focus();
        }
        this._removePostMessagesListeners();
        this.container.remove();
        clearInterval(this.autoCloseInterval);
        document.removeEventListener("navbeforefocus", blockFocusHandle);
    }

    _listenOnPopState() {
        const onPopStateHandler = () => {
            this._close();
            window.removeEventListener("onpopstate", onPopStateHandler);
        };
        window.addEventListener("popstate", onPopStateHandler);
    }

    _historyGoBack() {
        if (window.location.hash === "#plasma-ad-banner") {
            history.back();
        }
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
        const url = "https://ssp.rambler.ru/sberdevapp.jsp?" + new URLSearchParams(this.sspParams);
        const response = await fetch(url);
        const { source, height, width } = await response.json();
        if (!source || !height || !width) {
            throw new Error("Некорректный ответ сервера");
        }
        return {
            source,
            height,
            width,
        };
    }
}
