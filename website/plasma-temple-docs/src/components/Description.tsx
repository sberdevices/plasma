import React, { FC } from 'react';
import { Description as DescriptionView } from '@sberdevices/plasma-docs-ui';

import { useDynamicImport } from '../hooks';

export const Description: FC<{ name: string }> = ({ name }) => {
    const { description } = useDynamicImport('@docgen', name);

    if (!description) {
        return null;
    }

    return <DescriptionView description={description} />;
};
