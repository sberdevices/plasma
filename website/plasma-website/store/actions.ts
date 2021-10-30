import type { Theme, WizardItemType } from './types';

export enum ActionTypes {
    SET_THEME = 'SET_THEME',
    SET_ITEM = 'SET_ITEM',
}

export type Action =
    | { type: ActionTypes.SET_THEME; payload: { theme: Theme } }
    | {
          type: ActionTypes.SET_ITEM;
          payload: {
              wizardItemType: WizardItemType;
              wizardItemName: string;
          };
      };

export const setTheme = (theme: Theme): Action => ({ type: ActionTypes.SET_THEME, payload: { theme } });
export const setWizardItem = (wizardItemType: WizardItemType, wizardItemName: string): Action => ({
    type: ActionTypes.SET_ITEM,
    payload: { wizardItemType, wizardItemName },
});
