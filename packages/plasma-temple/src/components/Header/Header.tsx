import React from 'react';
import { isSberBox } from '@sberdevices/plasma-ui/utils';
import { Header as UIKitHeader } from '@sberdevices/plasma-ui';

import { HeaderProps } from './types';

export const Header: React.FC<HeaderProps> = (props) => {
    const withBackProps =
        isSberBox() || props.back !== undefined
            ? props
            : {
                  ...props,
                  back: true as const,
                  onBackClick: () => window.history.back(),
              };

    return <UIKitHeader {...withBackProps} />;
};
