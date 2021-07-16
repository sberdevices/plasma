import { WizardItemType } from '../types';
import { SET_ITEM, WizardAction } from '../actions/wizard';

export type WizardState = {
    type: WizardItemType | '';
    name: string;
};

const defaultState: WizardState = {
    type: '',
    name: '',
};

export const wizardReducer = (state: WizardState = defaultState, action: WizardAction): WizardState => {
    switch (action.type) {
        case SET_ITEM:
            return { ...state, type: action.payload.type, name: action.payload.name };
        default:
            return state;
    }
};
