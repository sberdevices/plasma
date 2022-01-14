export enum TemplateEnum {
    INTERACTIVE = 'interactive',
    LARGE = 'large',
    MINIMAL = 'minimal'
}
export type Image = HTMLImageElement;
export type Container = HTMLDivElement;

export type RequiredKeys<T> = { [K in keyof T]-?: Record<string, unknown> extends Pick<T, K> ? never : K }[keyof T];

export type Config = {
    image: Image;
    container: Container;
    site: string;
    template?: TemplateEnum;
    withSkeleton?: boolean;
    maxCount?: number;
}

export type Product = {
    active: boolean
    currency: string
    'external_id': string
    id: number
    name: string
    'old_price': number
    pic: string
    pics: string[]
    price: number
    retailer: {
        id: number
        name: string
        logo: string
        'invalidate_price_in': null
    }
    url: string
    vendor: string
}

export type EventProduct = Product & {
    index: number,
    amount: number
}

export enum EventTypeEnum {
    ShownTab = 'ShownTab',
    ClickedTab = 'ClickedTab',
    OpenedTab = 'OpenedTab'
}

export type EventBody = { 'event_type': EventTypeEnum, 'event_properties': Record<string, unknown>}

export enum EventTab {
    Clothes = 'сlothes',
    Actors = 'actors',
    Accessories = 'accessories',
    Merch = 'merch',
    Furniture = 'furniture',
    Food = 'food',
    Locations = 'locations'
}
