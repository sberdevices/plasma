import { HeaderProps } from '@sberdevices/plasma-ui/components/Header/Header';

import { AnyObject, AssistantAppState, AssistantInstance } from '../../types';

export type PushScreenParams<
    PageStateType extends AnyObject,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Params extends Record<keyof PageStateType, any>,
    Name extends keyof Params
> = Name extends keyof Params ? [Name, Params[Name]] : [Name];

export interface PushScreenFn<S, P extends { [key in keyof S]: unknown }> {
    <T extends keyof S, P1 extends P[T]>(name: T, params: P extends void ? never : P1): void;
    <T extends keyof S>(name: T, params?: never): void;
}

export interface PageMethods<
    State,
    PageStateType extends AnyObject,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PageParamsType extends Partial<Record<keyof PageStateType, any>>,
    PageType extends keyof PageStateType = keyof PageStateType
> {
    pushHistory: <T extends PageType>(name: T, data: PageStateType[T]) => void;
    pushScreen: PushScreenFn<PageStateType, PageParamsType>;
    goToScreen: <T extends PageType>(name: T) => void;
    popScreen: () => void;
    changeState: (data: State) => void;
    sendData: AssistantInstance['sendData'];
    setAssistantState: <T extends AssistantAppState>(state: T) => void;
}

export type PageComponent<
    PageStateType extends AnyObject,
    Name extends keyof PageStateType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PageParamsType extends Partial<Record<keyof PageStateType, any>> = Partial<Record<keyof PageStateType, any>>
> = React.ComponentType<
    PageMethods<PageStateType[Name], PageStateType, PageParamsType, Name> & {
        name: Name;
        state: PageStateType[Name];
        params: PageParamsType[Name];
        assistant: AssistantInstance | null;
        fallbackComponent?: React.ReactNode;
        header?: HeaderProps;
    }
>;
