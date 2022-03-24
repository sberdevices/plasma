import React, { forwardRef, ReactElement, RefAttributes } from 'react';

import { SelectView } from './SelectView';
import { withSingleSelect } from './withSingleSelect';
import { withMultiSelect } from './withMultiSelect';
import type { SelectViewProps } from './SelectView';
import type { SelectRefElement } from './SelectButton';

export type SelectProps<T = any> = (
    | {
          /**
           * Выбор нескольких значений.
           */
          multiselect?: false;
          /**
           * Разделитель выбранных значений.
           */
          separator?: never;
      }
    | {
          /**
           * Выбор нескольких значений.
           */
          multiselect?: true;
          /**
           * Разделитель выбранных значений.
           */
          separator?: string;
      }
) & {
    /**
     * Значение контрола.
     */
    value: T;
    /**
     * Обработчик изменения значения.
     */
    onChange?: (value: T) => void;
} & Omit<SelectViewProps, 'onItemClick' | 'value' | 'label' | 'multiselect'>;

const SingleSelect = withSingleSelect(SelectView);
const MultiSelect = withMultiSelect(SelectView);

/**
 * Выпадающий список для использования в формах.
 * Поддерживает выбор одного или нескольких значений.
 */
// eslint-disable-next-line prefer-arrow-callback
export const Select = forwardRef<SelectRefElement, SelectProps>(function Select(props, ref) {
    if (props.multiselect) {
        return <MultiSelect ref={ref} {...props} />;
    }
    return <SingleSelect ref={ref} {...props} />;
}) as <T>(props: SelectProps<T> & RefAttributes<SelectRefElement>) => ReactElement;
