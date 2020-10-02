import { buttonFocused } from 'plasma-tokens';
import { css } from 'styled-components';

export const addFocus = () => css`
    &:focus {
        outline: none;
        box-shadow: 0 0 0 4px ${buttonFocused};
    }
`;
