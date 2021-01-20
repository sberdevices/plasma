import React from 'react';

import { Basebox, BaseboxProps } from '../Checkbox/Basebox';

export type RadioboxProps = Omit<BaseboxProps, 'type'>;
export const Radiobox: React.FC<RadioboxProps> = (props) => <Basebox type="radio" {...props} />;
