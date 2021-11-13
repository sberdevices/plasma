import toFixedDigits from "./toFixedDigits";

const formatProgress = (progress) => {
    const hours = Math.floor(progress / (60 * 60 * 1000));
    const minutes = Math.floor((progress / (60 * 1000)) % 60);
    const seconds = Math.floor((progress / 1000) % 60);
    const ms = progress % 1000;

    return (
        toFixedDigits(hours, 2) +
        ":" +
        toFixedDigits(minutes, 2) +
        ":" +
        toFixedDigits(seconds, 2) +
        "." +
        toFixedDigits(ms, 3)
    );
};

export default formatProgress;
