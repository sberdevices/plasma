import React from 'react';
import { ParagraphText1, TextBox } from '@sberdevices/plasma-ui';
import { BiggerTitle } from '@sberdevices/plasma-ui/components/TextBox/TextBox';

import { ProductTitleProps } from './types';

export const ProductTitleSberBox: React.FC<ProductTitleProps> = ({ title, subtitle }) => (
    <TextBox>
        <BiggerTitle>{title}</BiggerTitle>
        <ParagraphText1>{subtitle}</ParagraphText1>
    </TextBox>
);
