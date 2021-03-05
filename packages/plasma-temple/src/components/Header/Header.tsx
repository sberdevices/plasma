import styled from 'styled-components';
import { mediaQuery } from '@sberdevices/ui/utils';
import { Header as UIKitHeader } from '@sberdevices/ui/components/Header/Header';

export const Header = styled(UIKitHeader)`
    ${mediaQuery('M')`
        padding-top: 1.125rem;
        padding-bottom: 1.125rem;
    `}
`;
