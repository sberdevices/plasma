import { Description } from '../../../types';

export interface ProductDescriptionProps {
    layout: 'row' | 'column';
    items: Description[];
    description?: string;
    className?: string;
}
