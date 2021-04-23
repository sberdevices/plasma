import React from 'react';

import { SelectViewProps } from './SelectView';
import { SingleSelect, SingleSelectProps } from './SingleSelect';
import { MultiSelect, MultiSelectProps } from './MultiSelect';

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

/**
 * Выпадающий список для использования в формах.
 * Поддерживает выбор одного или нескольких значений.
 */
export const Select = React.forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
    if (props.multiselect) {
        return <MultiSelect ref={ref} {...props} />;
    }
    return <SingleSelect ref={ref} {...props} />;
});
