import { ThemeProps as BaseProps } from 'styled-components';

export type ThemeProps = BaseProps<{
    /**
     * Отключить любую анимацию компонента.
     */
    disableAnimation?: boolean;
}>;
