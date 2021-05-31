import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { sberPortal, sberBox, mobile } from '@sberdevices/plasma-tokens/typo';
import { sberPortalScale } from '@sberdevices/plasma-tokens';
import { transformStyles } from '@sberdevices/plasma-core';

import { detectDevice, deviceScales, DeviceKind } from '../../utils';

/* stylelint-disable */
const transformWithRoot = (typo: typeof sberBox) => `
:root {
    ${transformStyles(typo[':root'])}
}`;
const typoSizes = {
    sberBox: createGlobalStyle`${transformWithRoot(sberBox)}`,
    sberPortal: createGlobalStyle`${transformWithRoot(sberPortal)}`,
    mobile: createGlobalStyle`${transformWithRoot(mobile)}`,
};
/* stylelint-enable */

export interface DeviceThemeProps {
    /**
     * Объект темы для стилизованных компонентов.
     *
     * Внутри `DeviceThemeProvider` использует `styled-components/ThemeProvider`
     * и расширяет объект темы полем `deviceScale`.
     */
    theme?: object;
    /**
     * Пользовательская функция определения устройства.
     *
     * Должна возвращать 3 возможных значения - `sberBox` или `sberPortal` или `mobile`.
     *
     * Возвращаемое значение  по умолчанию - `sberBox`.
     *
     * При значениях `sberBox` и `sberPortal` типографика примет размер **x2**, а при `mobile` - **x1**.
     */
    detectDeviceCallback?: () => DeviceKind;
}

/**
 * Провайдер обязателен для использования, необходимо обернуть в него все приложение.
 *
 * Назначение - определяет, на какой *поверхности* (**устройстве**) запущено приложение.
 *
 * В зависимости от поверхности, применяет глобальные стили типографики,
 * подходящие данной платформе, ко всему приложению.
 *
 * Функцией определения по умолчанию тип поверхности определяется на основании `userAgent`,
 * при отсутствии `navigator` или `userAgent`, поверхность будет определен как `sberBox`.
 *
 * Имеется возможность передать провайдеру собственную логику определения девайса
 * с помощью пропса `detectDeviceCallback`.
 * При этом стоит помнить, что разрешены только 3 стандартных значения.
 */
export const DeviceThemeProvider: React.FC<DeviceThemeProps> = ({
    theme,
    children,
    detectDeviceCallback = detectDevice,
}) => {
    const deviceKind = detectDeviceCallback();
    const deviceScale = deviceScales[deviceKind] || sberPortalScale;
    const Typo = React.useMemo(() => typoSizes[deviceKind], [deviceKind]);

    return (
        <ThemeProvider theme={{ ...theme, deviceScale }}>
            <Typo />
            {children}
        </ThemeProvider>
    );
};
