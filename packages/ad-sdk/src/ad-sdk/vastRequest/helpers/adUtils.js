const requested = Symbol("requested");

export const markAdAsRequested = (ad) => {
    ad[requested] = true;
};

export const unmarkAdAsRequested = (ad) => {
    delete ad[requested];
};

export const hasAdBeenRequested = (ad) => Boolean(ad[requested]);
