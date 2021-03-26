import React from 'react';
import {
    DatePicker as UIDatePicker,
    DatePickerProps as UIDatePickerProps,
    Button,
} from '@sberdevices/plasma-ui';

import { useFocusOnMount } from '../../../hooks/useFocusOnMount';
import { withWrapField } from '../hocs/withWrapField';
import { FieldComponentProps } from '../types';

type DatePickerProps = FieldComponentProps<UIDatePickerProps, 'onSubmit' | 'onChange', {
    onSubmit: () => void;
    onChange: (val: Date) => void;
}>

export const DatePicker = withWrapField<Date, DatePickerProps>(function DatePicker(props) {
    const { value = new Date(), max, min, onChange, onSubmit } = props;

    const mountRef = React.useRef<HTMLButtonElement>(null);
    useFocusOnMount(mountRef, {
        delay: 250,
    });

    return (
        <>
            <UIDatePicker value={new Date(value || max)} onChange={onChange} min={min} max={max} />
            <Button size="s" view="secondary" onClick={onSubmit} ref={mountRef}>
                Сохранить
            </Button>
        </>
    );
}, 'select');
