import React from 'react';
import { Headline1, ParagraphText1, TextBox } from '@sberdevices/plasma-ui';

import { ProductTitleProps } from './types';

export const ProductTitleSberBox: React.FC<ProductTitleProps> = ({ title, subtitle, ...rest }) => (
    <TextBox {...rest}>
        <Headline1 breakWord={false}>{title}</Headline1>
        <ParagraphText1>{subtitle}</ParagraphText1>
    </TextBox>
);
