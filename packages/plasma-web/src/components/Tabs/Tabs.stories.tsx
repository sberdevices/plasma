import React from 'react';
import { text, number, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Tabs, TabItem } from '.';

export const Default = () => {
    const items = Array(number('Items', 4)).fill(0);
    const disabled = boolean('disabled', false);
    const [index, setIndex] = React.useState(0);

    return (
        <Tabs stretch={boolean('stretch', true)} disabled={disabled}>
            {items.map((_, i) => (
                <TabItem
                    key={`item:${i}`}
                    isActive={i === index}
                    tabIndex={!disabled ? i : -1}
                    onClick={() => !disabled && setIndex(i)}
                    onFocus={action(`onFocus item #${i}`)}
                    onBlur={action(`onBlur item #${i}`)}
                >
                    {text('Text', 'Label')}
                </TabItem>
            ))}
        </Tabs>
    );
};
