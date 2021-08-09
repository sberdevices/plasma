import React from 'react';
import { Story, Meta } from '@storybook/react';

import { disableProps } from '../../helpers';

import { IconSet, IconSetProps } from './IconSet';

const propsToDisable = ['size', 'exclude', 'include'];

export default {
    title: 'Content/Icon',
    component: IconSet,
    argTypes: {
        ...disableProps(propsToDisable),
    },
} as Meta;

export const XsSize = () => <IconSet size="xs" include={['chevronUp', 'chevronDown', 'disclosureRight']} />;

export const SmallSize = () => <IconSet size="s" exclude={['chevronUp', 'chevronDown']} />;

export const CustomColor: Story<IconSetProps> = ({ color }) => (
    <IconSet color={color} exclude={['chevronUp', 'chevronDown']} />
);

CustomColor.args = {
    color: '#fc0',
};
