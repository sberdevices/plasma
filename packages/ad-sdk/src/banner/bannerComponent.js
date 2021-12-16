import { addStyle } from "../utils/addStyle";
import { createElement } from "../utils/createElement";

function createCrossIcon({ onClickCloseButton, style }) {
    const crossCircleIcon = createElement({
        elementName: "svg",
        namespace: "http://www.w3.org/2000/svg",
        style: {
            display: "block",
        },
        attributes: {
            width: "40px",
            height: "40px",
            viewBox: "0 0 24 24",
            fill: "none",
            color: "inherit",
        },
    });

    const crossCircleIconContent = createElement({
        elementName: "path",
        namespace: "http://www.w3.org/2000/svg",
        attributes: {
            d:
                "M12 2c5.522 0 10 4.477 10 10s-4.478 10-10 10S2 17.523 2 12 6.478 2 12 2zM8.707 7.292a1 1 0 00-1.414 1.415L10.586 12l-3.293 3.293a.999.999 0 00-.083 1.32l.083.094a.997.997 0 001.414 0L12 13.414l3.293 3.293a.996.996 0 00.58.285L16 17a.999.999 0 00.707-1.707L13.414 12l3.293-3.293a1 1 0 00.083-1.32l-.083-.095a1 1 0 00-1.414 0L12 10.585 8.707 7.292z",
            fill: "white",
        },
    });

    crossCircleIcon.appendChild(crossCircleIconContent);

    const button = createElement({
        elementName: "button",
        style: Object.assign(
            {
                background: "none",
                border: "none",
                padding: "0",
                margin: "0",
                position: "relative",
            },
            style
        ),
    });

    button.addEventListener("click", (event) => {
        event.stopPropagation();
        onClickCloseButton(event);
    });

    button.appendChild(crossCircleIcon);
    return button;
}

function createBackBlock({ onClickCloseButton, isTvRemote }) {
    if (isTvRemote) {
        return createElement({
            elementName: "div",
            style: {
                color: "white",
            },
            innerText: 'Чтобы вернуться нажмите "назад"',
            classList: ["back-title"],
        });
    } else {
        return createCrossIcon({
            onClickCloseButton,
            style: {
                flexGrow: "0",
                flexShrink: "0",
            },
        });
    }
}

function createTimerText({ autoCloseTime, timerId }) {
    const timerText = createElement({
        elementName: "div",
        style: {
            color: "white",
        },
    });
    timerText.innerHTML = `Реклама закроется через <span id="${timerId}">${autoCloseTime}</span>с`;
    return timerText;
}

function getIframeSize(width, height) {
    let resultWidth;
    let resultHeight;
    if (width.indexOf("%") !== -1) {
        resultWidth = "100%";
    } else {
        resultWidth = width;
    }

    if (height.indexOf("%") !== -1) {
        resultHeight = "100%";
    } else {
        resultHeight = height;
    }

    return {
        width: resultWidth,
        height: resultHeight,
    };
}

function getBannerContainerSize(width, height) {
    let resultWidth;
    let resultHeight;
    if (width.indexOf("%") !== -1) {
        resultWidth = width;
    }

    if (height.indexOf("%") !== -1) {
        resultHeight = height;
    }

    return {
        width: resultWidth,
        height: resultHeight,
    };
}

export function createBanner({
    iframeUrl,
    width,
    height,
    timerId,
    autoCloseTime,
    onLoadIframe,
    onClickCloseButton,
    isTvRemote,
}) {
    const iframeSize = getIframeSize(width, height);

    const adIframe = createElement({
        elementName: "iframe",
        id: "plasma-ad-frame",
        style: {
            border: "none",
        },
        attributes: {
            src: iframeUrl,
            width: iframeSize.width,
            height: iframeSize.height,
        },
    });
    adIframe.addEventListener("load", onLoadIframe);

    const adWrapper = createElement({
        elementName: "div",
        style: {
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            display: "none",
        },
    });

    const containerSize = getBannerContainerSize(width, height);
    const banner = createElement({
        elementName: "div",
        style: {
            margin: "auto",
            flexShrink: "0",
            flexGrow: "0",
            maxWidth: "100vw",
            maxHeight: "100vh",
            padding: "5px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "strength",
            width: containerSize.width || null,
            height: containerSize.height || null,
        },
    });

    if (isTvRemote) {
        const adHeader = createElement({
            elementName: "div",
            style: {
                display: "flex",
                alignItems: "center",
                boxSizing: "border-box",
                padding: "5px",
                flexGrow: "0",
                flexShrink: "0",
            },
        });

        const backBlock = createBackBlock({ onClickCloseButton, isTvRemote });

        const textTimer = createTimerText({ autoCloseTime, timerId });
        addStyle(textTimer, {
            flexGrow: "1",
            flexShrink: "1",
        });

        adHeader.appendChild(textTimer);
        adHeader.appendChild(backBlock);

        banner.appendChild(adHeader);
    }

    if (isTvRemote) {
        const linkWrapper = createElement({
            elementName: "a",
            id: "plasma-ad-banner-link",
            style: {
                flexGrow: "1",
                flexShrink: "1",
            },
            attributes: {
                href: "https://plasma.sberdevices.ru/",
                target: "_blank",
            },
        });

        linkWrapper.appendChild(adIframe);
        banner.appendChild(linkWrapper);
    } else {
        banner.appendChild(adIframe);
    }

    adWrapper.appendChild(banner);
    return adWrapper;
}

export function createPreloader({ id }) {
    const adWrapper = createElement({
        elementName: "div",
        style: {
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            display: "flex",
        },
        id: id,
    });

    const preloader = createElement({
        elementName: "div",
        style: {
            margin: "auto",
            color: "white",
        },
        innerText: "Loading...",
    });

    adWrapper.appendChild(preloader);
    return adWrapper;
}
