import React from 'react';

import { Basebox, BaseboxProps } from '../Checkbox/Basebox';

export type RadioboxProps = Omit<BaseboxProps, 'type'>;

/**
 * Переключатель, или *радиокнопка*.
 */
export const Radiobox: React.FC<RadioboxProps> = (props) => <Basebox type="radio" {...props} />;
