export type Size = 'l' | 's';
export interface SizeProps {
    /**
     * Размер компонента
     */
    size?: Size;
}
export type Item = {
    value: string | number | Date;
    label: string | number;
};

export type DateType = readonly [number, number, number];

export type TimeType = readonly [number, number, number];
