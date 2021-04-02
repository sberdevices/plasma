import React from 'react';
import { text, number, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Icon } from '@sberdevices/plasma-icons';

import { InSpacingDecorator } from '../../helpers';

import { Tabs, TabItem } from '.';

export default {
    title: 'Controls/Tabs',
    component: Tabs,
    decorators: [InSpacingDecorator],
};

const sizeKeys = ['l', 'm', 's'];
const viewKeys = ['secondary', 'black', 'clear'];
const icons = ['clock', 'settings', 'house', 'trash'];

export const Default = () => {
    const items = Array(number('Items', 4)).fill(0);
    const stretch = boolean('stretch', true);
    const pilled = boolean('pilled', false);
    const outlined = boolean('outlined', false);
    const disabled = boolean('disabled', false);
    const [index, setIndex] = React.useState(0);

    return (
        <Tabs
            size={select('size', sizeKeys, 'l') as 'l'}
            view={select('view', viewKeys, 'secondary') as 'secondary'}
            stretch={stretch}
            pilled={pilled}
            scaleOnPress={boolean('scaleOnInteraction', true)}
            outlined={!disabled && outlined}
            disabled={disabled}
        >
            {items.map((_, i) => (
                <TabItem
                    key={`item:${i}`}
                    isActive={i === index}
                    tabIndex={!disabled ? i : -1}
                    contentLeft={
                        boolean('contentLeft', true) && <Icon icon={icons[i % icons.length] as 'clock'} size="s" />
                    }
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
