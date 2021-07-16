import { WizardItemType } from '../types';

export const SET_ITEM = 'WIZARD/SET_ITEM';

export type WizardAction = {
    type: typeof SET_ITEM;
    payload: {
        type: WizardItemType;
        name: string;
    };
};

export const setWizardItem = (type: WizardItemType, name: string): WizardAction => ({
    type: SET_ITEM,
    payload: { type, name },
});
