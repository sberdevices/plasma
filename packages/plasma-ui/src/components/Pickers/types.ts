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
