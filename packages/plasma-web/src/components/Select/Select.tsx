import React, { forwardRef } from 'react';

import { SelectView } from './SelectView';
import { withSingleSelect, SingleSelectProps } from './withSingleSelect';
import { withMultiSelect, MultiSelectProps } from './withMultiSelect';
import type { SelectViewProps, SelectRefElement } from './Select.types';

export type SelectProps = Omit<SelectViewProps, 'label'> &
    (
        | {
              /**
               * Выбор нескольких значений.
               */
              multiselect?: false;
              /**
               * Значение компонента.
               */
              value: SingleSelectProps['value'];
              /**
               * Разделитель выбранных значений.
               */
              separator?: never;
              /**
               * Обработчик изменения значения.
               */
              onChange?: SingleSelectProps['onChange'];
          }
        | {
              multiselect: true;
              value: MultiSelectProps['value'];
              separator?: string;
              onChange?: MultiSelectProps['onChange'];
          }
    );

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
