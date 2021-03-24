/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { AssistantSmartAppData, createAssistant } from '@sberdevices/assistant-client';
import { Ratio } from '@sberdevices/ui/components/Image';

import { InitializeParams } from './assistant';
import { CurrentHistory, SetPositionPayload, SetStatePayload, SetStepPayload, AppStateAction } from './store/reducer';

// eslint-disable-next-line no-shadow
export enum Screen {
    gallery = 'Screen.Gallery',
    entity = 'Screen.Entity',
    detail = 'Screen.Detail',
}

export enum Axis {
    X = 'x',
    Y = 'y',
}

export enum Direction {
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
    DOWN = 'DOWN',
    UP = 'UP',
    FORWARD = 'FORWARD',
    BACK = 'BACK',
}

export interface AssistantAction {
    type: string;
    payload: Record<string, unknown>;
}

export interface AssistantDataAction extends AssistantSmartAppData {
    action: AssistantAction;
}

export type AssistantInstance = ReturnType<typeof createAssistant>;

export type PickOptional<S, K extends keyof S> = Partial<Pick<S, K>>;
export type AspectRatio = Ratio;
export interface MetaPayload {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    meta?: Record<string, any>;
}

// TODO: импортнуть из кита
export interface HeaderPropsPayload {
    title: string;
    subtitle?: string;
    logo?: string;
}

export interface MediaObject {
    src: string[] | string;
    ratio?: AspectRatio;
}

export interface GalleryItemViewPayload extends MetaPayload {
    id: string;
    label: string;
    position: number;
    image: MediaObject;
    description?: string;
    tag?: string;
    time?: string;
}

export interface ItemViewEntity extends MetaPayload {
    label: string;
    image: MediaObject;
    position: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export interface EntityPayload extends MetaPayload, HeaderPropsPayload {
    background?: MediaObject;
    entities: Array<ItemViewEntity>;
    id: string | number;
    description: { title: string; content: string }[];
    itemShowButtonText: string;
    entitiesTitle: string;
}

export interface GalleryViewPayload extends MetaPayload, HeaderPropsPayload {
    items: Array<GalleryItemViewPayload>;
    title: string;
}

export type MultiGalleryViewPayload = GalleryViewPayload | (GalleryViewPayload & { id: string })[];

export interface DetailPayload extends MetaPayload, HeaderPropsPayload {
    order?: string[];
}

export interface OnDataApi {
    popState(): void;
    pushState(data: CurrentHistory): void;
    setState(data: SetStatePayload): void;
    setPosition(position: SetPositionPayload): void;
    setStep(step: SetStepPayload): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendData(params: any): void;
}

export interface OnData {
    <A extends AssistantAction = AssistantAction>(action: A, api: OnDataApi):
        | AppStateAction
        | void
        | Promise<void | AppStateAction>;
}

export interface OnStart {
    (api: OnDataApi): void | Promise<void>;
}

export interface AssistantConfig extends Omit<InitializeParams, 'getState'> {
    onData?: OnData;
    onStart?: (api: OnDataApi) => void | Promise<void>;
}

export interface NextRoute {
    type: Screen;
    pathToParam: string | Array<string>;
}

export interface BaseRoute<T extends Screen> {
    type: T;
    next?: NextRoute;
    header?: Partial<HeaderPropsPayload>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component?: React.ComponentType<any> | React.LazyExoticComponent<React.ComponentType<any>>;
    assistant?: PickOptional<AssistantConfig, 'onData'>;
}

export interface GalleryCardProps {
    card: GalleryItemViewPayload;
    index: number;
    activeCardIndex: number;
    onClick: (card: GalleryItemViewPayload) => void;
    onFocus: (index: number) => void;
}
export interface GalleryRoute extends BaseRoute<Screen.gallery> {
    galleryCard?: React.FC<GalleryCardProps>;
}

export type Route = BaseRoute<Screen.entity> | BaseRoute<Screen.detail> | GalleryRoute;

export type onPopStateFn = (historyState: CurrentHistory) => Promise<CurrentHistory> | CurrentHistory;

export interface CanvasAppConfig {
    routes: Route[];
    header: HeaderPropsPayload;
    assistant: AssistantConfig;
    onPopState?: onPopStateFn;
}

export interface AppStateItem {
    title: string;
    number?: number;
    id?: string;
    action: {
        type: string;
        payload?: Record<string, unknown>;
    };
}

export interface AppState {
    // eslintdisable-next-line camelcase
    item_selector: {
        items: Array<AppStateItem>;
    };
    screen?: string;
    [key: string]: unknown;
}

export interface InnerAssistantAction {
    name: 'REQUEST_DATA';
    action: {
        // eslintdisable-next-line camelcase
        action_id: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parameters: Record<string, any>;
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface PageProps<D = any> {
    dispatch: React.Dispatch<AppStateAction>;
    data: D;
    header: HeaderPropsPayload;
    sendData: AssistantInstance['sendData'];
    step: number;
    position: number;
    stateRef: React.MutableRefObject<AppState>;
    nextRoute?: {
        type: Screen;
        pathToParam: string | string[];
    };
}
