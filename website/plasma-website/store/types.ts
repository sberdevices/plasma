export type Theme = 'light' | 'dark';
export type WizardItemType = 'icon' | 'color';

export interface State {
    theme: Theme;
    wizardItemType?: WizardItemType;
    wizardItemName?: string;
}
