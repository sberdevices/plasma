import React from 'react';
import { Headline2, ParagraphText1, TextBox } from '@sberdevices/plasma-ui';

import { ProductTitleProps } from './types';

export const ProductTitleSberPortal: React.FC<ProductTitleProps> = ({ title, subtitle }) => (
    <TextBox>
        <Headline2>{title}</Headline2>
        <ParagraphText1>{subtitle}</ParagraphText1>
    </TextBox>
);
