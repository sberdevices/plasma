import once from "../dom/once";

const updateMedia = (videoElement, media) =>
    new Promise((resolve) => {
        const state = {
            currentTime: videoElement.currentTime,
            playing: !videoElement.paused,
        };

        if (state.playing) {
            videoElement.pause();
        }

        videoElement.src = media.src;
        videoElement.load();

        once(videoElement, "loadeddata", () => {
            videoElement.currentTime = state.currentTime;

            if (state.playing) {
                videoElement.play();
            }

            resolve();
        });
    });

export default updateMedia;
