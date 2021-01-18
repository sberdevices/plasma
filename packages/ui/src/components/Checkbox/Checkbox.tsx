import React from 'react';

import { Basebox, BaseboxProps } from './Basebox';

export type CheckboxProps = Omit<BaseboxProps, 'type'>;
export const Checkbox: React.FC<CheckboxProps> = (props) => <Basebox type="checkbox" {...props} />;
