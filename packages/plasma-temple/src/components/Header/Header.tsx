import React from 'react';
import { NeuHeader as UIKitHeader } from '@sberdevices/plasma-ui';

import { HeaderProps } from './types';
import { useNewHeaderProps, useHeaderProps } from './useHeaderProps';

export { useHeaderProps };

export const Header: React.FC<HeaderProps> = (props) => {
    const headerProps = useNewHeaderProps(props);

    return <UIKitHeader {...headerProps} />;
};
