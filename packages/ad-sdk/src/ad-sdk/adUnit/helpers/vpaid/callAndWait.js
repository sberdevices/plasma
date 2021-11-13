import waitFor from "./waitFor";

const callAndWait = (creativeAd, method, event, ...args) => {
    const waitPromise = waitFor(creativeAd, event, 5000);

    creativeAd[method](...args);

    return waitPromise;
};

export default callAndWait;
