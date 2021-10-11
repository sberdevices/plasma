import React from 'react';

import { AnyObject } from '../../types';

export const withProps = <P extends AnyObject, R = null>(defaultProps: P) => (
    Component: React.ComponentType<P>,
): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<R>> =>
    React.forwardRef<R, P>((props, ref) => {
        return <Component {...defaultProps} {...props} ref={ref} />;
    });
