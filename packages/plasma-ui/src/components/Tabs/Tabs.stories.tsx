import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Icon, IconClock } from '@sberdevices/plasma-icons';

import { InSpacingDecorator, disableProps } from '../../helpers';

import { Tabs, TabItem, TabsProps, TabsController, TabsControllerProps } from '.';

const sizeKeys = ['l', 'm', 's'];
const viewKeys = ['secondary', 'black', 'clear'];
const icons = ['clock', 'settings', 'house', 'trash'];

const propsToDisable = ['index', 'focused', 'shiftLeft', 'shiftRight', 'scaleOnPress', 'as', 'forwardedAs'];

export default {
    title: 'Controls/Tabs',
    component: Tabs,
    decorators: [InSpacingDecorator],
    argTypes: {
        animated: {
            control: {
                type: 'boolean',
            },
        },
        size: {
            control: {
                type: 'inline-radio',
                options: sizeKeys,
            },
        },
        view: {
            control: {
                type: 'inline-radio',
                options: viewKeys,
            },
        },
        ...disableProps(propsToDisable),
    },
} as Meta;

interface StoryProps {
    itemsNumber: number;
    scaleOnInteraction: boolean;
    enableContentLeft: boolean;
    text: string;
}

export const Default: Story<StoryProps & TabsProps> = ({
    itemsNumber,
    size,
    view,
    stretch,
    pilled,
    scaleOnInteraction,
    enableContentLeft,
    text,
    disabled,
    outlined,
    animated,
}) => {
    const id = 'tabs-example';
    const items = Array(itemsNumber).fill(0);
    const [index, setIndex] = React.useState(0);

    return (
        <Tabs
            id={id}
            size={size}
            view={view}
            stretch={stretch}
            pilled={pilled}
            scaleOnPress={scaleOnInteraction}
            outlined={!disabled && outlined}
            disabled={disabled}
            index={index}
            animated={animated}
            forwardedAs="ul"
        >
            {items.map((_, i) => (
                <TabItem
                    key={`item:${i}`}
                    forwardedAs="li"
                    isActive={i === index}
                    aria-controls={id}
                    tabIndex={0}
                    contentLeft={enableContentLeft && <Icon icon={icons[i % icons.length] as 'clock'} size="s" />}
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
    size: 'l',
    view: 'secondary',
    stretch: true,
    pilled: false,
    scaleOnInteraction: true,
    outlined: false,
    disabled: false,
    animated: true,
    enableContentLeft: true,
    text: 'Label',
};

export const Arrows: Story<StoryProps & TabsControllerProps> = ({
    itemsNumber,
    disabled,
    stretch,
    text,
    enableContentLeft,
}) => {
    const items = Array(itemsNumber).fill({
        label: text,
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
    text: 'Label',
};
