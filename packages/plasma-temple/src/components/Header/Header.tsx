import styled, { css } from 'styled-components';
import { mediaQuery } from '@sberdevices/ui/utils';
import { Header as UIKitHeader } from '@sberdevices/ui/components/Header/Header';

export const headerPaddingYM = 1.125;

export const Header = styled(UIKitHeader)`
    ${mediaQuery('M')(css`
        padding-top: ${headerPaddingYM}rem;
        padding-bottom: ${headerPaddingYM}rem;
    `)}
`;
