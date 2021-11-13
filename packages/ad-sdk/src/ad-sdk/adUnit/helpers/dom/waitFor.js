import once from "./once";

class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

const waitFor = (element, event) => {
    let pending = true;
    const { promise, reject, resolve } = new Deferred();
    const cancelOnce = once(element, event, (...args) => {
        pending = false;
        resolve(args);
    });
    const cancel = () => {
        if (pending) {
            pending = false;
            cancelOnce();
            reject(new Error("waitFor was canceled"));
        }
    };

    return {
        cancel,
        promise,
    };
};

export default waitFor;
