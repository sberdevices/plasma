import React from 'react';
import styled from 'styled-components';
import { isSberBox, mediaQuery } from '@sberdevices/ui/utils';
import { Header as UIKitHeader } from '@sberdevices/ui/components/Header/Header';
import { HeaderPropsPayload } from '../../types';

const StyledHeader = styled(UIKitHeader)`
    ${mediaQuery('M')`
        padding-top: 1.125rem;
        padding-bottom: 1.125rem;
    `}
`;

interface HeaderProps extends HeaderPropsPayload {
    back?: boolean;
}

export const Header = (props: HeaderProps) => {
    const backProps = React.useMemo(() => isSberBox()
        ? {}
        : {
            back: true,
            onBackClick: () => window.history.back(),
        }, []);

    return <StyledHeader {...backProps} {...props} />
}
