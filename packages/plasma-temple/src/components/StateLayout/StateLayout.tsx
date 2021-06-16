import React from 'react';

import { useRegistry } from '../../hooks/useRegistry';

import { StateLayoutCommonProps } from './types';

export const StateLayout: React.FC<StateLayoutCommonProps> = (props) => {
    const { StateLayout: Component } = useRegistry();

    return <Component {...props} />;
};
