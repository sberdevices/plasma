import React from 'react';

import { ProductImageSlider } from './ProductImageSlider';

export default {
    title: 'Product/Image Slider',
};

export const Default = (): React.ReactElement => {
    return <ProductImageSlider images={['images/img.png', 'images/placeholder.png', 'images/cat.png']} />;
};
