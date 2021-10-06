export const formatSecondsToMintues = (seconds: number) =>
    new Date(Math.round(seconds) * 1000).toISOString().substr(11, 8).replace(/^00:/, '');
