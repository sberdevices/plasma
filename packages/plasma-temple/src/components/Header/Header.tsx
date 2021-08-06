import React from 'react';
import { Header as UIKitHeader } from '@sberdevices/plasma-ui';

import { HeaderProps } from './types';
import { useHeaderProps } from './useHeaderProps';

export const Header: React.FC<HeaderProps> = (props) => {
    const headerProps = useHeaderProps(props);

    return <UIKitHeader {...headerProps} />;
};
