import fetchHtml from "../fetch/fetchHtml";

const createHtmlResource = (src, { document, data }) => {
    const { height, width } = data;
    const divElement = document.createElement("DIV");

    if (width) {
        divElement.style.width = `${width}px`;
    }

    if (height) {
        divElement.style.height = `${height}px`;
    }

    fetchHtml(src)
        // eslint-disable-next-line promise/always-return, promise/prefer-await-to-then
        .then((html) => {
            divElement.innerHTML = html;

            divElement.dispatchEvent(new CustomEvent("load"));
        })
        .catch(() => {
            divElement.dispatchEvent(new CustomEvent("error"));
        });

    return divElement;
};

export default createHtmlResource;
