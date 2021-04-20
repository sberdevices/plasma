import { AssistantNavigationCommand, AssistantSmartAppData, createAssistant } from '@sberdevices/assistant-client';
import { Ratio } from '@sberdevices/plasma-ui';
import { detectDevice } from '@sberdevices/plasma-ui/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = Record<string, any>;

export type PickOptional<S, K extends keyof S> = Partial<Pick<S, K>>;
export type AspectRatio = Ratio;

export type Axis = 'x' | 'y';

export type Direction = AssistantNavigationCommand['navigation']['command'];

export type DeviceFamily = ReturnType<typeof detectDevice>;

export interface AssistantAction {
    type: string;
    payload: Record<string, unknown>;
}

export interface AssistantDataAction extends AssistantSmartAppData {
    action: AssistantAction;
}

export type AssistantInstance = ReturnType<typeof createAssistant>;

export interface MetaPayload {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    meta?: Record<string, any>;
}

export interface Description {
    title: string;
    content: string;
}

export interface MediaObject {
    src: string[] | string;
    ratio?: AspectRatio;
    covered?: boolean;
}

export interface AssistantAppStateItem {
    title: string;
    number?: number;
    id?: string;
    action: {
        type: string;
        payload?: Record<string, unknown>;
    };
}

export interface AssistantAppState {
    // eslint-disable-next-line camelcase
    item_selector: {
        items: Array<AssistantAppStateItem>;
    };
    screen?: string;
    [key: string]: unknown;
}
