import styled, { css } from 'styled-components';
import { body2 } from '@sberdevices/plasma-tokens';
import { mediaQuery } from '@sberdevices/plasma-core';

import { Headline4 } from '../Typography';

/**
 * Компонент для размещения заголовка.
 */
export const HeaderTitle = styled(Headline4)`
    margin: 0;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    ${(props) =>
        mediaQuery(
            'S',
            props.theme.deviceScale,
        )(css`
            ${body2};
        `)}
`;
