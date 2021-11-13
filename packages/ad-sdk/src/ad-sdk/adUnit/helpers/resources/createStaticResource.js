const createStaticResource = (src, { document, data }) => {
    const { height, width } = data;
    const img = document.createElement("IMG");

    if (width) {
        img.width = width;
    }

    if (height) {
        img.height = height;
    }

    img.src = src;

    return img;
};

export default createStaticResource;
