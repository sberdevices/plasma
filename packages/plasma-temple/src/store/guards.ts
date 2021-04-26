import { AssistantSmartAppData } from '@sberdevices/assistant-client';

import {
    AppStateActionType,
    ChangeStateAction,
    CharacterAction,
    InsetsAction,
    PopHistoryAction,
    PushHistoryAction,
} from './types';

export const isPushHistoryAction = (
    smartAppData: AssistantSmartAppData['smart_app_data'],
): smartAppData is PushHistoryAction => {
    const action = smartAppData as PushHistoryAction;
    return action?.type === AppStateActionType.PUSH_HISTORY && Boolean(action.payload?.history?.name);
};

export const isPopHistoryAction = (
    smartAppData: AssistantSmartAppData['smart_app_data'],
): smartAppData is PopHistoryAction => {
    const action = smartAppData as PopHistoryAction;
    return action?.type === AppStateActionType.POP_HISTORY;
};

export const isCharacterAction = (
    smartAppData: AssistantSmartAppData['smart_app_data'],
): smartAppData is CharacterAction => {
    const action = smartAppData as CharacterAction;
    return action?.type === AppStateActionType.CHARACTER && Boolean(action.payload?.character);
};

export const isInsetsAction = (smartAppData: AssistantSmartAppData['smart_app_data']): smartAppData is InsetsAction => {
    const action = smartAppData as InsetsAction;
    return action?.type === AppStateActionType.INSETS && Boolean(action.payload?.insets);
};

export const isChangeStateAction = (
    smartAppData: AssistantSmartAppData['smart_app_data'],
): smartAppData is ChangeStateAction => {
    const action = smartAppData as ChangeStateAction;
    return action?.type === AppStateActionType.CHANGE_ACTIVE_SCREEN_STATE && Boolean(action.payload?.data);
};

export const isPlasmaAppAction = (action: AssistantSmartAppData['smart_app_data']): boolean => {
    if (!action) {
        return false;
    }

    return [
        isPushHistoryAction,
        isPopHistoryAction,
        isCharacterAction,
        isInsetsAction,
        isChangeStateAction,
    ].some((guard) => guard(action));
};
