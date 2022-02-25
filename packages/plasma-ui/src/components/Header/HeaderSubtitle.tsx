import styled, { css } from 'styled-components';
import { mediaQuery } from '@sberdevices/plasma-core';

import { TextBoxSubTitle } from '../TextBox';
import { ThemeProviderValue } from '../Device/DeviceDetection';

/**
 * Компонент для размещения подзаголовка.
 */
export const HeaderSubtitle = styled(TextBoxSubTitle)`
    margin: 0;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    ${({ theme }: { theme: ThemeProviderValue }) => css`
        ${mediaQuery(
            'S',
            theme.deviceScale,
        )(css`
            display: none;
        `)}
    `}
`;
