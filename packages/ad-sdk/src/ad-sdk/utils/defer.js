const defer = () => {
    const deferred = {};
    const promise = new Promise((resolve, reject) => {
        deferred.resolve = resolve;
        deferred.reject = reject;
    });

    deferred.promise = promise;

    return deferred;
};

export default defer;
