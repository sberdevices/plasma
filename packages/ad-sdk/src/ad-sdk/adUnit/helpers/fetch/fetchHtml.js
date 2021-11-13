const isValidContentType = (contentType) => {
    const normalisedCT = contentType.toLowerCase();

    return ["text/plain", "text/html"].some((allowedType) => normalisedCT.includes(allowedType));
};

const fetchHtml = async (endpoint) => {
    const response = await fetch(endpoint);
    const contentType = response.headers.get("Content-Type");

    if (response.status >= 400) {
        const error = new Error(response.statusText);

        error.response = response;
        throw error;
    }

    if (!isValidContentType(contentType)) {
        const error = new Error(`fetchHtml error, invalid Content-Type ${contentType}`);

        error.response = response;
        throw error;
    }

    return response.text();
};

export default fetchHtml;
