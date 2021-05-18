import React from 'react';
import { general, additional } from '@sberdevices/plasma-colors';

import { InSpacingDecorator, PaletteGrid, flattenPalette } from '../helpers';

export default {
    title: 'Colors',
    decorators: [InSpacingDecorator],
};

const generalColors = flattenPalette(general);
const additionalColors = flattenPalette((additional as unknown) as typeof general);

export const General = () => <PaletteGrid colors={generalColors} />;
export const Additional = () => <PaletteGrid colors={additionalColors} />;
