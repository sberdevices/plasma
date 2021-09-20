import React, { forwardRef } from 'react';
import { withSingleSelect, withMultiSelect } from '@sberdevices/plasma-web';
import type { SelectProps, SelectRefElement } from '@sberdevices/plasma-web';

import { SelectView } from './SelectView';

export type { SelectProps };

const SingleSelect = withSingleSelect(SelectView);
const MultiSelect = withMultiSelect(SelectView);

/**
 * Выпадающий список для использования в формах.
 * Поддерживает выбор одного или нескольких значений.
 */
export const Select = forwardRef<SelectRefElement, SelectProps>((props, ref) => {
    if (props.multiselect) {
        return <MultiSelect ref={ref} {...props} />;
    }
    return <SingleSelect ref={ref} {...props} />;
});
