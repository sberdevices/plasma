import { Banner } from "./banner";
import { injectCss } from "../utils/injectCss";

let enableToOpenBanner = true;

function generateStyles({ rootId, outlineSize = "0.125rem", outlineOffset = outlineSize, outlineRadius = 0 }) {
    return `
        #${rootId} button:focus::before {
            content: '';

            position: absolute;
            top: -${outlineOffset};
            left: -${outlineOffset};
            right: -${outlineOffset};
            bottom: -${outlineOffset};

            display: block;
            box-sizing: content-box;

            border: ${outlineSize} solid transparent;
            border-radius: ${outlineRadius};

            transition: box-shadow 0.2s ease-in-out;

            pointer-events: none;

            box-shadow: 0 0 0 ${outlineSize} green;
        }

        #${rootId} iframe a:focus::before {
            content: '';

            position: absolute;
            top: -${outlineOffset};
            left: -${outlineOffset};
            right: -${outlineOffset};
            bottom: -${outlineOffset};

            display: block;
            box-sizing: content-box;

            border: ${outlineSize} solid transparent;
            border-radius: ${outlineRadius};

            transition: box-shadow 0.2s ease-in-out;

            pointer-events: none;

            box-shadow: 0 0 0 ${outlineSize} green;
        }
    `;
}

export function openBanner({ container, params, cooldownTime, events, isTvRemote }) {
    if (!container.id) {
        throw new Error("id у container обязателен");
    }
    injectCss(generateStyles({ rootId: container.id }));
    const isAlreadyOpen = !!document.getElementById(container.id);
    if (!isAlreadyOpen && enableToOpenBanner) {
        enableToOpenBanner = false;
        setTimeout(() => {
            enableToOpenBanner = true;
        }, cooldownTime);

        const banner = new Banner(container, events, params, { isTvRemote });
        banner.run();
    } else {
        events.onError();
    }
}
