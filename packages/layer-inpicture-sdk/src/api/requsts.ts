import { getID } from '../utils/getId';
import { Config, EventBody, EventProduct, EventTab, EventTypeEnum, Product } from '../types';

export const loadProducts = async (img: HTMLImageElement, site: string, maxCount?: number) => {
    const url = new URL('https://layer-dev.sberdevices.ru/iimg/v0/recognize');
    url.search = new URLSearchParams({ url: img.src, utm: site }).toString();

    const response = await fetch(url.toString());
    const responseJSON = await response.json();
    const { products } = responseJSON.data;

    // TODO убрать, когда будет реализована фильтрация на беке
    const result: { [x: string]: Product } = {};
    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        if (maxCount && maxCount === Object.keys(result).length) break;

        if (!result[`${product.vendor}`]) {
            result[`${product.vendor}`] = product;
        }
    }

    return Object.values(result);
};

const createEventRequst = ({ image, site, template, eventBody }: Config & { eventBody: EventBody }) => {
    const body = JSON.stringify({
        events: [
            {
                UserID: getID(),
                event_time: new Date().toISOString(),
                image_url: image.src,
                page_url: window.location.href,
                site_name: site,
                site_url: window.location.hostname,
                template,
                ...eventBody,
            },
        ],
    });

    try {
        fetch('https://okr.sbdv.ru/events/layer?api_key=VqkFfVZIHn7dfuNdRZWjXhykmiGugvR9&env=prod', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body,
        });
    } catch (e) {
        throw new Error(e);
    }
};

export const sendShowWidgetEvent = (config: Config) => {
    const eventParams = {
        ...config,
        eventBody: {
            event_type: EventTypeEnum.ShownTab,
            event_properties: {
                hasClothes: true,
            },
        },
    };

    createEventRequst(eventParams);
};

export const sendOpenedWidgetEvent = (config: Config) => {
    const eventParams = {
        ...config,
        eventBody: {
            event_type: EventTypeEnum.OpenedTab,
            event_properties: {
                hasClothes: true,
            },
        },
    };

    createEventRequst(eventParams);
};

export const sendProductClickEvent = ({ product, ...otherParams }: Config & { product: EventProduct }) => {
    const { id, name, amount, index, retailer } = product;

    const eventParams = {
        ...otherParams,
        eventBody: {
            event_type: EventTypeEnum.ClickedTab,
            event_properties: {
                tab: EventTab.Clothes,
                itemId: id,
                itemName: name,
                itemAmount: amount,
                itemIndex: index,
                retailerName: retailer.name,
            },
        },
    };

    createEventRequst(eventParams);
};
