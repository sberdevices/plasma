import React, { FC, HTMLAttributes } from 'react';
import marked from 'marked';

export interface DescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    description: string;
}

export const Description: FC<DescriptionProps> = ({ description }) => {
    const HTMLDescription = marked(description);
    return <div dangerouslySetInnerHTML={{ __html: HTMLDescription }} />;
};
