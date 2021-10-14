import React from 'react';

import { HeaderArrow, HeaderArrowProps } from './HeaderArrow';

export interface HeaderBackProps extends Omit<HeaderArrowProps, 'arrow'> {}

/**
 * Кнопка свернуть.
 */
export const HeaderMinimize: React.FC<HeaderBackProps> = (props) => <HeaderArrow arrow="minimize" {...props} />;
