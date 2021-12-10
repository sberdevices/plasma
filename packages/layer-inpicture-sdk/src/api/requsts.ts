const BASE_URL = 'https://mcrai.sberdevices.ru/v2/frame-mp';

export const loadProducts = async (img: HTMLImageElement) => {
    const formData = new FormData();

    const responseImg = await fetch(img.src);
    const blob = await responseImg.blob();

    formData.append('frame', blob, 'foo.jpg');

    const requestOptions = {
        method: 'POST',
        body: formData,
    };

    const response = await fetch(BASE_URL, requestOptions);
    return (await response.json()).data.products;
};
