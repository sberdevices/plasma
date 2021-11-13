/**
 * unique will create a unique string every time is called, sequentially and namespaced
 *
 * @ignore
 * @param {string} namespace
 */
const unique = (namespace) => {
    let count = -1;

    return function () {
        return namespace + "_" + ++count;
    };
};

export default unique;
