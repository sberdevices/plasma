export const loadProducts = async (img: HTMLImageElement, site: string) => {
    const url = new URL('https://layer-dev.sberdevices.ru/iimg/v0/recognize');
    url.search = new URLSearchParams({ url: img.src, utm: site }).toString();

    const response = await fetch(url.toString());

    return (await response.json()).data.products;
};
