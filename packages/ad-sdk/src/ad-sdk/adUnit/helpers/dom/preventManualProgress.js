const preventManualProgress = (videoElement) => {
    // IOS video clock is very unreliable and we need a 3 seconds threshold to ensure that the user forwarded/rewound the ad
    const PROGRESS_THRESHOLD = 3;
    let previousTime = 0;
    let skipAttempts = 0;

    const preventAdSkip = () => {
        // Ignore ended event if the Ad time was not 'near' the end
        // and revert time to the previous 'valid' time
        if (videoElement.duration - previousTime > PROGRESS_THRESHOLD) {
            // this reduces the video jitter if the IOS skip button is pressed
            videoElement.pause();

            // we need to trigger the play to put the video element back in a valid state
            videoElement.play();
            videoElement.currentTime = previousTime;
        }
    };

    const preventAdSeek = () => {
        const currentTime = videoElement.currentTime;
        const progressDelta = Math.abs(currentTime - previousTime);

        if (progressDelta > PROGRESS_THRESHOLD) {
            skipAttempts += 1;
            if (skipAttempts >= 2) {
                videoElement.pause();
            }
            videoElement.currentTime = previousTime;
        } else {
            previousTime = currentTime;
        }
    };

    videoElement.addEventListener("timeupdate", preventAdSeek);
    videoElement.addEventListener("ended", preventAdSkip);

    return () => {
        videoElement.removeEventListener("timeupdate", preventAdSeek);
        videoElement.removeEventListener("ended", preventAdSkip);
    };
};

export default preventManualProgress;
