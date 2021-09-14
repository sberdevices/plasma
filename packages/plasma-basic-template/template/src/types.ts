import { AssistantSmartAppData } from '@sberdevices/assistant-client';
import { GalleryPageState, PlasmaAppProps } from '@sberdevices/plasma-temple';

export type AssistantProps = PlasmaAppProps['assistantParams'];
export type AppHeaderProps = PlasmaAppProps['header'];

export interface Film {
    id: string;
    name: string;
    poster: string;
    genre: string;
    rating: number;
}

// Тип описывает состояние экранов приложения
export interface PageStateType {
    gallery: GalleryPageState<Film>;
    film: Film | null;
}

// Тип описывает параметры экранов с которыми они открываются при использовании pushScreen
export interface PageParamsType {
    film: { id: string };
}

// Экшены взаимодействия с ассистентом
export enum ActionType {
    OPEN_ITEM = 'openItem',
}

export type OpenItemAction = { type: ActionType.OPEN_ITEM; payload: { id: string } };

export type AssistantAction = OpenItemAction;

export interface AssistantDataAction extends AssistantSmartAppData {
    smart_app_data: AssistantAction;
}
