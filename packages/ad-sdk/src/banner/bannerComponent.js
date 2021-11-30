function createCrossIcon({ onClickCloseButton }) {
    const crossCircleIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    crossCircleIcon.style.display = "block";
    crossCircleIcon.setAttribute("width", "40px");
    crossCircleIcon.setAttribute("height", "40px");
    crossCircleIcon.setAttribute("viewBox", "0 0 24 24");
    crossCircleIcon.setAttribute("fill", "none");
    crossCircleIcon.setAttribute("color", "inherit");

    const crossCircleIconContent = document.createElementNS("http://www.w3.org/2000/svg", "path");
    crossCircleIconContent.setAttribute(
        "d",
        "M12 2c5.522 0 10 4.477 10 10s-4.478 10-10 10S2 17.523 2 12 6.478 2 12 2zM8.707 7.292a1 1 0 00-1.414 1.415L10.586 12l-3.293 3.293a.999.999 0 00-.083 1.32l.083.094a.997.997 0 001.414 0L12 13.414l3.293 3.293a.996.996 0 00.58.285L16 17a.999.999 0 00.707-1.707L13.414 12l3.293-3.293a1 1 0 00.083-1.32l-.083-.095a1 1 0 00-1.414 0L12 10.585 8.707 7.292z"
    );
    crossCircleIconContent.setAttribute("fill", "white");
    crossCircleIcon.appendChild(crossCircleIconContent);
    const button = document.createElement("button");
    button.appendChild(crossCircleIcon);
    button.style.background = "none";
    button.style.border = "none";
    button.style.padding = "0";
    button.style.margin = "0";
    button.style.position = "relative";
    button.addEventListener("click", (event) => {
        event.stopPropagation();
        onClickCloseButton(event);
    });
    return button;
}

function createTimerText({ autoCloseTime, timerId }) {
    const timerText = document.createElement("div");
    timerText.innerHTML = `Реклама закроется через <span id="${timerId}">${autoCloseTime}</span>с`;
    timerText.style.color = "white";
    return timerText;
}

export function createBanner({ iframeUrl, width, height, timerId, autoCloseTime, onLoadIframe, onClickCloseButton }) {
    const adIframe = document.createElement("iframe");
    adIframe.setAttribute("src", iframeUrl);
    adIframe.setAttribute("width", width);
    adIframe.setAttribute("height", height);
    adIframe.style.border = "none";
    const viewPortWidth = window.innerWidth;
    const viewPortHeight = window.innerHeight;
    const widthPixel = parseInt(width);
    const heightPixel = parseInt(height);
    if (widthPixel > viewPortWidth || heightPixel > viewPortHeight) {
        const widthRatio = viewPortWidth / widthPixel;
        const heightRatio = viewPortHeight / heightPixel;
        const ratio = widthRatio < heightRatio ? widthRatio : heightRatio;
        adIframe.style.transformOrigin = "left top";
        adIframe.style.transform = `scale(${ratio})`;
    }
    adIframe.addEventListener("load", onLoadIframe);

    const adWrapper = document.createElement("div");
    adWrapper.style.position = "absolute";
    adWrapper.style.top = "0";
    adWrapper.style.left = "0";
    adWrapper.style.width = "100%";
    adWrapper.style.height = "100%";
    adWrapper.style.display = "none";

    const banner = document.createElement("div");
    banner.style.margin = "auto";
    banner.style.flexShrink = "0";
    banner.style.flexGrow = "0";
    banner.style.maxWidth = "100vw";
    banner.style.maxHeight = "100vh";

    const adHeader = document.createElement("div");
    adHeader.style.display = "flex";
    adHeader.style.alignItems = "center";

    const crossCircleIcon = createCrossIcon({ onClickCloseButton });
    crossCircleIcon.style.flexGrow = "0";
    crossCircleIcon.style.flexShrink = "0";

    const textTimer = createTimerText({ autoCloseTime, timerId });
    textTimer.style.flexGrow = "1";
    textTimer.style.flexShrink = "1";

    adHeader.appendChild(textTimer);
    adHeader.appendChild(crossCircleIcon);

    banner.appendChild(adHeader);
    banner.appendChild(adIframe);

    adWrapper.appendChild(banner);
    return adWrapper;
}

export function createPreloader({ id }) {
    const adWrapper = document.createElement("div");
    adWrapper.style.position = "absolute";
    adWrapper.style.top = "0";
    adWrapper.style.left = "0";
    adWrapper.style.width = "100%";
    adWrapper.style.height = "100%";
    adWrapper.style.display = "flex";
    adWrapper.id = id;

    const preloader = document.createElement("div");
    preloader.innerText = "Loading...";
    preloader.style.margin = "auto";
    preloader.style.color = "white";

    adWrapper.appendChild(preloader);
    return adWrapper;
}
