export interface AsProps<T = any> {
    /**
     * Сменить рендер на другой тип компонента.
     */
    as?: keyof JSX.IntrinsicElements | React.ComponentType<T>;
}
