import { HeaderProps } from '@sberdevices/plasma-ui/components/Header/Header';
import { AssistantAppState, AssistantInstance } from '../../types';

type PushScreenParams<Name extends string, Params extends Record<string, any>> = Name extends keyof Params
    ? [Name, Params[Name]]
    : [Name];

export interface PageMethods<
    State = unknown,
    PageType extends string = string,
    PageStateType extends Record<PageType, any> = any,
    PageParamsType extends Partial<Record<PageType, any>> = any
> {
    pushHistory: <T extends PageType>(name: T, history: PageStateType[T]) => void;
    pushScreen: <T extends PageType>(...args: PushScreenParams<T, PageParamsType>) => void;
    popScreen: () => void;
    changeState: (data: State) => void;
    sendData: AssistantInstance['sendData'];
    setAssistantState: <T extends AssistantAppState>(state: T) => void;
}

export type PageComponent<
    Name extends PageType,
    PageType extends string = string,
    PageStateType extends Record<PageType, any> = any,
    PageParamsType extends Partial<Record<PageType, any>> = any
> = React.ComponentType<
    PageMethods<PageStateType[Name], PageType, PageStateType, PageParamsType> & {
        name: Name;
        state: PageStateType[Name];
        params: PageParamsType[Name];
        assistant: AssistantInstance | null;
        fallbackComponent?: React.ReactNode;
        header?: HeaderProps;
    }
>;
