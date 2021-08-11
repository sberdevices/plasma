import React from 'react';
import { Dropdown } from '@sberdevices/plasma-web';
import { DropdownList } from '@sberdevices/plasma-web/components/Dropdown/DropdownList';
import { DropdownItem } from '@sberdevices/plasma-web/components/Dropdown/DropdownItem';

import { CardShowcase, WebStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'Web/Controls/Dropdown',
    component: Dropdown,
    decorators: [WebStoryDecorator, InSpacingDecorator],
};

const items = [
    { value: 'each', label: 'Каждый' },
    { value: 'hunter', label: 'Охотник', isDisabled: true },
    { value: 'wants', label: 'Желает' },
    { value: 'toKnow', label: 'Знать' },
    { value: 'where', label: 'Где' },
    { value: 'is', label: 'Сидит' },
    { value: 'thePheasant', label: 'Фазан' },
    { value: 'fulllabel', label: 'Каждый охотник желает знать, где сидит фазан' },
];

const sections = {
    Basic: {
        Default: (
            <DropdownList>
                {items.map((item) => (
                    <DropdownItem key={item.value} {...item} />
                ))}
            </DropdownList>
        ),
    },
};

export const Default = () => <CardShowcase sections={sections} />;
