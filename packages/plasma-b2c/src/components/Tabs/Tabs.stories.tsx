import React, { useState } from 'react';
import { IconClock } from '@sberdevices/plasma-icons';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { InSpacingDecorator, disableProps } from '@sberdevices/plasma-sb-utils';

import { Tabs, TabsProps, TabItem, TabsController } from '.';

const propsToDisable = ['ref', 'theme', 'as', 'forwardedAs'];

export default {
    title: 'Controls/Tabs',
    component: Tabs,
    argTypes: {
        ...disableProps(propsToDisable),
    },
    decorators: [InSpacingDecorator],
} as Meta;

interface DeafultStoryProps extends TabsProps {
    itemsNumber: number;
    label: string;
    enableContentLeft: boolean;
}

export const Default: Story<DeafultStoryProps> = ({ itemsNumber, disabled, label, enableContentLeft, ...rest }) => {
    const items = Array(itemsNumber).fill(0);
    const [index, setIndex] = useState(0);

    return (
        <Tabs disabled={disabled} {...rest}>
            {items.map((_, i) => (
                <TabItem
                    key={`item:${i}`}
                    isActive={i === index}
                    tabIndex={!disabled ? i : -1}
                    contentLeft={enableContentLeft && <IconClock color="inherit" />}
                    onClick={() => !disabled && setIndex(i)}
                    onFocus={action(`onFocus item #${i}`)}
                    onBlur={action(`onBlur item #${i}`)}
                >
                    {label}
                </TabItem>
            ))}
        </Tabs>
    );
};

Default.args = {
    itemsNumber: 4,
    disabled: false,
    stretch: false,
    pilled: false,
    view: 'secondary',
    label: 'Label',
    enableContentLeft: true,
};

export const Arrows: Story<DeafultStoryProps> = ({ itemsNumber, disabled, stretch, label, enableContentLeft }) => {
    const items = Array(itemsNumber).fill({
        label,
        contentLeft: enableContentLeft && <IconClock color="inherit" />,
    });
    const [index, setIndex] = useState(0);

    return (
        <TabsController
            items={items}
            index={index}
            onIndexChange={(i) => setIndex(i)}
            stretch={stretch}
            disabled={disabled}
        />
    );
};

Arrows.args = {
    itemsNumber: 4,
    disabled: false,
    stretch: true,
    label: 'Label',
};
