import styled from 'styled-components';

import { TextBox } from '../TextBox';

/**
 * Обертывающий компонент для заголовка и подзаголовка.
 */
export const HeaderTitleWrapper = styled(TextBox)`
    display: flex;
    flex-direction: column;
    align-self: center;

    flex: 1 1 max-content;
    max-width: max-content;
    min-width: 10%;
`;
