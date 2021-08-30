import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { disableProps } from '../../helpers';

import { Tabs, TabsProps, TabItem } from '.';

const propsToDisable = ['ref', 'theme', 'as', 'forwardedAs'];

export default {
    title: 'Controls/Tabs',
    component: Tabs,
    argTypes: {
        ...disableProps(propsToDisable),
    },
} as Meta;

interface DeafultStoryProps extends TabsProps {
    itemsNumber: number;
    text: string;
}

export const Default: Story<DeafultStoryProps> = ({ itemsNumber, disabled, stretch, text }) => {
    const items = Array(itemsNumber).fill(0);
    const [index, setIndex] = React.useState(0);

    return (
        <Tabs stretch={stretch} disabled={disabled}>
            {items.map((_, i) => (
                <TabItem
                    key={`item:${i}`}
                    isActive={i === index}
                    tabIndex={!disabled ? i : -1}
                    onClick={() => !disabled && setIndex(i)}
                    onFocus={action(`onFocus item #${i}`)}
                    onBlur={action(`onBlur item #${i}`)}
                >
                    {text}
                </TabItem>
            ))}
        </Tabs>
    );
};

Default.args = {
    itemsNumber: 4,
    disabled: false,
    stretch: true,
    text: 'Label',
};
