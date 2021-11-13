const fetch = async (endpoint, options = {}) => {
    const defaults = {
        credentials: "include",
    };
    const fetchOptions = Object.assign({}, defaults, options);
    const response = await window.fetch(endpoint, fetchOptions);

    if (response.status >= 400) {
        const error = new Error(response.statusText);

        error.response = response;
        throw error;
    }

    return response;
};

export default fetch;
