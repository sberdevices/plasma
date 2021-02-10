import React from 'react';

import { Basebox, BaseboxProps } from './Basebox';

export type CheckboxProps = Omit<BaseboxProps, 'type'>;

/**
 * Флажок или *чекбокс*. Позволяет пользователю управлять параметром с двумя состояниями — ☑ включено и ☐ отключено.
 */
export const Checkbox: React.FC<CheckboxProps> = (props) => <Basebox type="checkbox" {...props} />;
