import { HeaderProps } from '@sberdevices/plasma-ui/components/Header/Header';

import { AnyObject, AssistantAppState, AssistantInstance } from '../../types';

export type PushScreenParams<
    PageStateType extends AnyObject,
    Params extends Record<keyof PageStateType, unknown>,
    Name extends keyof Params
> = Name extends keyof Params ? [Name, Params[Name]] : [Name];

export interface PageMethods<
    State,
    PageStateType extends AnyObject,
    PageParamsType extends Partial<Record<keyof PageStateType, unknown>>,
    PageType extends keyof PageStateType = keyof PageStateType
> {
    pushHistory: <T extends PageType>(name: T, data: PageStateType[T]) => void;
    pushScreen: <T extends PageType>(...args: PushScreenParams<PageStateType, PageParamsType, T>) => void;
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
    PageMethods<PageStateType[Name], PageStateType, PageParamsType> & {
        name: Name;
        state: PageStateType[Name];
        params: PageParamsType[Name];
        assistant: AssistantInstance | null;
        fallbackComponent?: React.ReactNode;
        header?: HeaderProps;
    }
>;
