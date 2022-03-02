import React from 'react';
import { Image } from '@sberdevices/plasma-ui';

export const getImageToRender = (image: React.ReactNode) => {
    if (typeof image === 'string') {
        return <Image base="div" src={image} ratio="1 / 1" />;
    }

    if (React.isValidElement(image)) {
        return image;
    }

    return null;
};

export const useImageToRender = (image: React.ReactNode, children: React.ReactNode) => {
    return React.useMemo(() => {
        if (children) {
            return children;
        }

        if (image) {
            return getImageToRender(image);
        }

        return null;
    }, [children, image]);
};
