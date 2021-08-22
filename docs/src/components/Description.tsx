import React, { FC, HTMLAttributes } from 'react';

import { useDocgenInfo } from '../hooks/useDocgenInfo';

interface DescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    name: string;
}

export const Description: FC<DescriptionProps> = ({ name }) => {
    const { description } = useDocgenInfo(name);

    if (!description) {
        return null;
    }

    return <p>{description}</p>;
};
