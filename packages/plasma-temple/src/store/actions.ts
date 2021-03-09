import { createEmptyAction, createAction, Action, EmptyAction } from '../utils/createAction';

import { AppStateActions, CurrentHistory, SetStatePayload, SetPositionPayload, SetStepPayload } from './reducer';

interface ActionCreator<T extends string, P> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (payload: P): Action<T, P>;
}

export const popStateAction: EmptyAction<AppStateActions.popState> = createEmptyAction(AppStateActions.popState);

export const popStateWithUpdateHistoryAction: ActionCreator<AppStateActions.popStateWithUpdateHistory, CurrentHistory> = (payload) =>
    createAction(AppStateActions.popStateWithUpdateHistory, payload);

export const pushStateAction: ActionCreator<AppStateActions.pushState, CurrentHistory> = (payload) =>
    createAction(AppStateActions.pushState, payload);

export const setStateAction: ActionCreator<AppStateActions.setState, SetStatePayload> = (payload: SetStatePayload) =>
    createAction(AppStateActions.setState, payload);

export const setPositionAction: ActionCreator<AppStateActions.setPosition, SetPositionPayload> = (
    payload: SetPositionPayload,
) => createAction(AppStateActions.setPosition, payload);

export const setStepAction: ActionCreator<AppStateActions.setStep, SetStepPayload> = (payload: SetStepPayload) =>
    createAction(AppStateActions.setStep, payload);
