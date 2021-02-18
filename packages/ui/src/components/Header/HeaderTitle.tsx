import styled, { css } from 'styled-components';
import { body2 } from '@sberdevices/plasma-tokens';
import { mediaQuery } from '@sberdevices/plasma-core/utils';

import { TextBoxBigTitle } from '../TextBox';

/**
 * Компонент для размещения заголовка.
 */
export const HeaderTitle = styled(TextBoxBigTitle)`
    margin: 0;

    ${(props) =>
        mediaQuery(
            'S',
            props.theme.deviceScale,
        )(css`
            ${body2};
        `)}
`;
