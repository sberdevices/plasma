import styled, { css } from 'styled-components';
import { mediaQuery } from '@sberdevices/plasma-core';

import { TextBoxSubTitle } from '../TextBox';

/**
 * Компонент для размещения подзаголовка.
 */
export const HeaderSubtitle = styled(TextBoxSubTitle)`
    margin: 0;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    ${({ theme }) => css`
        ${mediaQuery(
            'S',
            theme.deviceScale,
        )(css`
            display: none;
        `)}
    `}
`;
