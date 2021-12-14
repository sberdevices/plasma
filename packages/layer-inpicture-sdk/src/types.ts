export type Template = 'primary' | 'secondary';
export type Image = HTMLImageElement;
export type Container = HTMLDivElement;

export type Config = {
    image: Image;
    container: Container;
    template?: Template;
    withSkeleton?: boolean;
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
