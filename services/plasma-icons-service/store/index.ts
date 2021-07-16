import { createStore, combineReducers } from 'redux';

import { AppAction } from './actions';
import { WizardAction } from './actions/wizard';
import { appReducer, AppState } from './reducers';
import { wizardReducer, WizardState } from './reducers/wizard';

export type Action = AppAction | WizardAction;

export const reducer = combineReducers({ app: appReducer, wizard: wizardReducer });

export interface State {
    app: AppState;
    wizard: WizardState;
}

export const store = createStore<State, Action, {}, {}>(reducer);
