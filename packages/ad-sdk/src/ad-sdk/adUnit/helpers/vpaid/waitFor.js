const waitFor = (creativeAd, event, timeout) =>
    new Promise((resolve, reject) => {
        // eslint-disable-next-line prefer-const
        let timeoutId;
        const handler = () => {
            if (typeof timeout === "number") {
                clearTimeout(timeoutId);
            }

            creativeAd.unsubscribe(handler, event);
            resolve();
        };

        if (typeof timeout === "number") {
            timeoutId = setTimeout(() => {
                creativeAd.unsubscribe(handler, event);
                reject(new Error(`Timeout waiting for event '${event}'`));
            }, timeout);
        }

        creativeAd.subscribe(handler, event);
    });

export default waitFor;
