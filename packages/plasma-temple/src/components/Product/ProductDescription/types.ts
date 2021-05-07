import React from 'react';

import { Description } from '../../../types';

interface ProductDescription extends Omit<Description, 'content'> {
    content: React.ReactNode;
}
export interface ProductDescriptionProps {
    layout: 'row' | 'column';
    items: ProductDescription[];
    description?: string;
    className?: string;
}
