import React from 'react';

import { AnyObject } from '../../types';

export const withProps = <P extends AnyObject>(defaultProps: P) => (Component: React.ComponentType<P>): React.FC<P> => (
    props,
) => {
    return <Component {...defaultProps} {...props} />;
};
