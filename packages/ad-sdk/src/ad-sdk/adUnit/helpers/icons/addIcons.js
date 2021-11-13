import renderIcons from "./renderIcons";

const firstRenderPending = Symbol("firstRenderPending");
const noop = () => {};

const hasPendingIconRedraws = (icons, videoElement) => {
    const currentTimeInMs = videoElement.currentTime * 1000;
    const videoDurationInMs = videoElement.duration * 1000;

    const iconsPendingToRedraw = icons.filter((icon) => !icon.offset || icon.offset < currentTimeInMs);
    const iconsPendingToBeRemoved = icons.filter((icon) => icon.duration && icon.duration < videoDurationInMs);

    return iconsPendingToRedraw.length > 0 || iconsPendingToBeRemoved.length > 0;
};

const removeDrawnIcons = (icons) =>
    icons
        .filter(({ element }) => Boolean(element) && Boolean(element.parentNode))
        .forEach(({ element }) => element.parentNode.removeChild(element));

const addIcons = (icons, { videoAdContainer, onIconView = noop, onIconClick = noop, ...rest } = {}) => {
    const { videoElement, element } = videoAdContainer;
    const drawIcons = async () => {
        const drawnIcons = await renderIcons(icons, {
            onIconClick,
            videoAdContainer,
            ...rest,
        });

        element.dispatchEvent(new CustomEvent("iconsDrawn"));

        drawnIcons.forEach((icon) => {
            if (icon[firstRenderPending]) {
                onIconView(icon);
                icon[firstRenderPending] = false;
            }
        });
    };

    icons.forEach((icon) => {
        icon[firstRenderPending] = true;
    });

    return {
        drawIcons,
        hasPendingIconRedraws: () => hasPendingIconRedraws(icons, videoElement),
        removeIcons: () => removeDrawnIcons(icons),
    };
};

export default addIcons;
