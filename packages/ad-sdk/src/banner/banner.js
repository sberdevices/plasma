import fetch from "../utils/fetch";
import { addStyle } from "../utils/addStyle";
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
    _triggerEvent = () => {};
    _addEventData = () => {};
    _closeByScript = false;

    constructor({ container, events = {}, sspParams, params = {} }) {
        this.container = container;
        this.onSuccess = events.onSuccess || (() => {});
        this.onError = events.onError || (() => {});
        this.onAdReady = events.onAdReady || (() => {});
        this.sspParams = sspParams;
        this._isTvRemote = params.isTvRemote;
        this._onIframeMessage = this._onIframeMessage.bind(this);
        this._onVisibilityChange = this._onVisibilityChange.bind(this);
        this._triggerEvent = params.triggerEvent;
        this._addEventData = params.addEventData;
    }

    async run() {
        this._triggerEvent("run");
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
                    this._triggerEvent("impression");
                    this._showBanner(banner);
                    this._hidePreloader();
                    this.onAdReady();

                    this._listenPostMessages();

                    if (this._isTvRemote) {
                        this._startAutoCloseTimer(banner);
                        this._blockFocus();
                    } else {
                        this._listenFollowLinkInFrame();
                    }
                },
                onClickCloseButton: () => {
                    this._closeAdSuccess();
                },
                onFollowLink: () => {
                    this._onFollowLink();
                },
            });

            this.container.appendChild(banner);

            document.body.append(this.container);
        } catch (err) {
            this._closeAdError();
            this._hidePreloader();
        }
    }

    _listenFollowLinkInFrame() {
        // Невозможно точно определять, что произошел переход по ссылке внутри iframe
        // Здесь определяем переход по косвенным признакам
        window.focus();

        window.addEventListener(
            "blur",
            () => {
                setTimeout(() => {
                    if (document.activeElement.tagName === "IFRAME") {
                        document.addEventListener("visibilitychange", this._onVisibilityChange, { once: true });
                    }
                });
            },
            { once: true }
        );
    }

    _onVisibilityChange() {
        if (document.visibilityState === "hidden") {
            this._onFollowLink();
        }
    }

    _onFollowLink() {
        this._triggerEvent("click");
    }

    _onIframeMessage(message) {
        const childWindow = document.getElementById("plasma-ad-frame").contentWindow;
        if (message.source !== childWindow) {
            return;
        }
        if (message.data && message.data.event === "close") {
            this._closeAdSuccess();
        }
    }

    _listenPostMessages() {
        window.addEventListener("message", this._onIframeMessage);
    }

    _removePostMessagesListeners() {
        window.removeEventListener("message", this._onIframeMessage);
    }

    _blockFocus() {
        const link = document.getElementById("plasma-ad-banner-link");
        if (link) {
            link.focus();
        }
        document.addEventListener("navbeforefocus", blockFocusHandle);
    }

    _showBanner(banner) {
        addStyle(banner, {
            display: "flex",
        });
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
            if (!this._closeByScript) {
                this.onSuccess();
            }
            this._close();
        };
        window.addEventListener("popstate", onPopStateHandler, { once: true });
    }

    _historyGoBack() {
        if (window.location.hash === "#plasma-ad-banner") {
            this._closeByScript = true;
            history.back();
            document.removeEventListener("visibilitychange", this._onVisibilityChange);
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
        this._addEventData("requestLink", url);
        try {
            const response = await fetch(url);
            const { source, height, width } = await response.json();
            if (!source || !height || !width) {
                throw new Error("Некорректный ответ сервера");
            }
            this._addEventData("responseLink", source);
            return {
                source,
                height,
                width,
            };
        } catch (e) {
            this._triggerEvent("errorOnLoad");
            throw e;
        }
    }
}
