import React from 'react';
import { text, number, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Icon } from '../Icon/Icon';

import { Tabs, TabsSize, TabsView } from './Tabs';
import { TabItem } from './TabItem';

export default {
    title: 'Tabs',
};

const sizeKeys = ['l', 'm', 's'] as TabsSize[];
const viewKeys = ['secondary', 'index', 'clear'] as TabsView[];
const icons = ['clock', 'settings', 'house', 'trash'];

export const Default = () => {
    const items = Array(number('Items', 4)).fill(0);
    const textEnabled = boolean('Enable text', true);
    const iconsEnabled = boolean('Enable icons', false);
    const label = text('label', 'Label');
    const fixedWidth = boolean('fixedWidth', true);
    const pilled = boolean('pilled', false);
    const motion = boolean('motion', false);
    const outlined = boolean('outlined', false);
    const disabled = boolean('disabled', false);
    const [index, setIndex] = React.useState(0);

    return (
        <Tabs
            size={select('size', sizeKeys, 'l')}
            view={select('view', viewKeys, 'secondary')}
            fixedWidth={fixedWidth}
            pilled={pilled}
            motion={motion}
            outlined={!disabled && outlined}
            disabled={disabled}
        >
            {items.map((_, i) => (
                <TabItem
                    key={`item:${i}`}
                    isActive={i === index}
                    tabIndex={!disabled ? i : -1}
                    contentLeft={iconsEnabled && <Icon icon={icons[i % icons.length]} size="s" />}
                    onClick={() => !disabled && setIndex(i)}
                    onFocus={action(`onFocus item #${i}`)}
                    onBlur={action(`onBlur item #${i}`)}
                >
                    {textEnabled && label}
                </TabItem>
            ))}
        </Tabs>
    );
};
