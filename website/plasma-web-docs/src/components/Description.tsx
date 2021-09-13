import React, { FC } from 'react';
import { Description as DescriptionView } from '@sberdevices/plasma-docs-ui';

import { useDynamicImport } from '../hooks/useDynamicImport';

export const Description: FC<{ name: string }> = ({ name }) => {
    const { description } = useDynamicImport(name);

    if (!description) {
        return null;
    }

    return <DescriptionView description={description} />;
};
