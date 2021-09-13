import React, { FC, HTMLAttributes } from 'react';

export interface DescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    description: string;
}

export const Description: FC<DescriptionProps> = ({ description }) => {
    return <p>{description}</p>;
};
