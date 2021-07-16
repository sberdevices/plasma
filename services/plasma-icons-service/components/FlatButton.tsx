import styled, { css } from 'styled-components';
import { Button } from '@sberdevices/plasma-web';
import { secondary, tertiary } from '@sberdevices/plasma-tokens-web';
import { link, linkHover, linkActive } from '@sberdevices/plasma-web/tokens';

export const FlatButton = styled(Button).attrs(() => ({ view: 'clear', forwardedAs: 'a' }))<{ isActive?: boolean }>`
    color: ${secondary};
    text-decoration: none;

    &:hover {
        color: ${linkHover};
    }

    &:active {
        color: ${linkActive};
    }

    ${({ isActive }) =>
        isActive &&
        css`
            color: ${link};
        `}

    ${({ $disabled }) =>
        $disabled &&
        css`
            &,
            &:hover,
            &:active {
                color: ${tertiary};
                cursor: default;
            }
        `}
`;
