import React from 'react';
import styled from 'styled-components';

import { Value, Item } from '../Basebox/Basebox';

import { Radiobox } from './Radiobox';

const StyledListRadiobox = styled(Radiobox)`
    & + & {
        margin-top: 1.25rem;
    }
`;

export type RadioboxListProps = {
    values: Value[];
    items: Item[];
    onChange?: (values: Value[]) => void;
};

// eslint-disable-next-line prefer-arrow-callback
export const RadioboxList = React.forwardRef<HTMLDivElement, RadioboxListProps>(function RadioboxList(
    { values, items, onChange },
    ref,
) {
    const handleChange = React.useCallback(
        (_, i) => {
            onChange?.([items[i].value]);
        },
        [onChange],
    );

    return (
        <div ref={ref}>
            {items.map((item, i) => (
                <StyledListRadiobox
                    key={`item:${i}`}
                    checked={values.indexOf(item.value) !== -1}
                    onChange={(event) => handleChange(event.target.value, i)}
                    {...item}
                />
            ))}
        </div>
    );
});
