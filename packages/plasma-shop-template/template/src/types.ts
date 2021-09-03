import React from 'react';
import { AssistantSmartAppData } from '@sberdevices/assistant-client';
import {
    AnyObject,
    GalleryPageState,
    PageComponent,
    PlasmaApp,
    ShopLandingPageState,
} from '@sberdevices/plasma-temple';

export type PlasmaAppProps = React.ComponentPropsWithoutRef<typeof PlasmaApp>;

export type AppHeaderProps = PlasmaAppProps['header'];
export type AssistantProps = PlasmaAppProps['assistantParams'];
export type OnStartFn = PlasmaAppProps['onStart'];

export interface Entity<Id> {
    name: string;
    id: Id;
}

export type Category = Entity<string>;

interface Price {
    value: number;
    currency: 'RUB';
}

export interface Address {
    country?: string;
    city: string;
    street: string;
    house: string;
    flat?: string;
    entrance?: string;
    floor?: string;
    comment?: string;
}
export interface Recipient {
    name: string;
    phone: string;
    email: string;
    address: Address;
}

export interface RecipientInfo {
    recipient: Recipient;
}

export interface Product extends Entity<string> {
    picture: string;
    manufacturer: string;
    complexity: 'высокая' | 'средняя' | 'низкая';
    material: string;
    price: Price;
    description: string;
    category: Entity<string>;
}

export type CommonCatalogData = Record<string, Product[]>;

export type CatalogData = Category | Product;

export interface PageState {
    main: ShopLandingPageState<Product> | null;
    catalog: GalleryPageState<CatalogData> | null;
    product: Product | null;
    history: null;
    about: null;
    makeOrder: null;
    recipient: null;
    orderSuccess: { orderNumber: string; amount: number };
    orderError: null;
    cart: null;
    delivery: null;
    contacts: null;
    legalInfo: null;
}

export interface PageParams {
    product: { id: string };
}

export type PageComponentProps<K extends keyof PageState> = React.ComponentProps<
    PageComponent<PageState, K, PageParams>
>;

export enum CatalogGalleryType {
    CATEGORIES = 'categories',
    POPULAR = 'popular',
}

export enum ActionType {
    OPEN_ITEM = 'openItem',
    ADD_TO_CART = 'addToCart',
    REMOVE_FROM_CART = 'removeFromCart',
    CLEAR_CART = 'clearCart',
    MAKE_ORDER = 'makeOrder',
    START_PAYMENT = 'startPayment',
    PAYMENT_FINISHED = 'paymentFinished',
    ERROR = 'error',
    PAYMENT_CONFIRMED = 'paymentConfirmed',
    CHANGE_RECIPIENT = 'changeRecipient',
    CHANGE_DELIVERY = 'changeDelivery',
    ACCESS_TOKEN = 'accessToken',
}

export enum ServerActionType {
    DONE_ADD_TO_CART = 'doneAddToCart',
    DONE_REMOVE_FROM_CART = 'doneRemoveFromCart',
    DONE_CLEAR_CART = 'doneClearCart',
    PAY = 'pay',
    CHECK_PAYMENT_STATUS = 'checkPaymentStatus',
    CART_QUANTITY_LIMIT = 'cartQuantityLimit',
    GET_ACCESS_TOKEN = 'getAccessToken',
    ERROR = 'error',
}

type EmptyObject = Record<string, never>;

export type AssistantAction =
    | { type: ActionType.OPEN_ITEM; payload: { id: string } & AnyObject }
    | { type: ActionType.ADD_TO_CART; payload: { quantity: number } }
    | { type: ActionType.REMOVE_FROM_CART }
    | { type: ActionType.CLEAR_CART }
    | { type: ActionType.MAKE_ORDER }
    | { type: ActionType.START_PAYMENT }
    | { type: ActionType.PAYMENT_FINISHED; payload: { invoiceId: string } }
    | { type: ActionType.ERROR; payload: { error: string } }
    | { type: ActionType.PAYMENT_CONFIRMED }
    | { type: ActionType.CHANGE_RECIPIENT }
    | { type: ActionType.CHANGE_DELIVERY }
    | { type: ActionType.ACCESS_TOKEN; payload: { token: string } };

export interface AssistantDataAction extends AssistantSmartAppData {
    smart_app_data: AssistantAction;
}

export type ServerAction =
    | { type: ServerActionType.DONE_REMOVE_FROM_CART; payload: { quantity: number } }
    | { type: ServerActionType.DONE_REMOVE_FROM_CART; payload: EmptyObject }
    | { type: ServerActionType.CHECK_PAYMENT_STATUS; payload: { invoiceId: string } }
    | { type: ServerActionType.CART_QUANTITY_LIMIT; payload: { limit: number } }
    | { type: ServerActionType.PAY; payload: { orderNumber: string } }
    | { type: ServerActionType.CHECK_PAYMENT_STATUS; payload: { invoiceId: string } }
    | { type: ServerActionType.GET_ACCESS_TOKEN; payload: EmptyObject }
    | { type: ServerActionType.ERROR; payload: { error?: string } };
