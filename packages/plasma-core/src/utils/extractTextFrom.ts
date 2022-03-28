import { isValidElement, Children } from 'react';
import type { ReactNode } from 'react';

export const extractTextFrom = (textSource?: string | number | null | ReactNode): string => {
    switch (typeof textSource) {
        case 'string':
            return textSource;
        case 'number':
            return textSource.toString();
        case 'object': {
            if (!isValidElement(textSource) || !textSource.props || !textSource.props.children) {
                return '';
            }
            return Children.map(textSource.props.children, (child) => {
                return extractTextFrom(child);
            }).join('');
        }
        default:
            return '';
    }
};
