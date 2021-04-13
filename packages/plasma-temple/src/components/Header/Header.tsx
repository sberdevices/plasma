import React from 'react';
import { isSberBox } from '@sberdevices/plasma-ui/utils';
import { Header as UIKitHeader } from '@sberdevices/plasma-ui';
import { HeaderProps } from '@sberdevices/plasma-ui/components/Header/Header';

export const Header = (props: HeaderProps) => {
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
