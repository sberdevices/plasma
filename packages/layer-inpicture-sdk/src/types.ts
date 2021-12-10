export type Template = 'primary' | 'secondary';
export type Image = HTMLImageElement;

export type Config = {
    image: Image;
    container: HTMLDivElement;
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
