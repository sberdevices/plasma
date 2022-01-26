export type PickerSize = 'l' | 's' | 'xs';
export type PickerVisibleItems = 5 | 3;
export interface SizeProps {
    /**
     * Размер компонента
     */
    size?: PickerSize;
}
export type PickerItem = {
    value: string | number | Date;
    label: string | number;
    isVirtual?: boolean;
};

export const DEFAULT_PICKER_SIZE: PickerSize = 's';
export const DEFAULT_VISIBLE_ITEMS: PickerVisibleItems = 5;

export type DateType = readonly [number, number, number];

export type TimeType = readonly [number, number, number];
