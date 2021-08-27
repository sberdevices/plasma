/* eslint-disable */
import React from 'react';
import { accent, success, warning, critical } from '@sberdevices/plasma-core';
import {
    IconEye,
    IconMagicWand,
    IconAccessibility,
    IconHeart,
    IconTrash,
    IconLocation,
} from '@sberdevices/plasma-icons';

import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

const items = [
    { value: 'each', label: 'Каждый' },
    { value: 'hunter', label: 'Охотник' },
    {
        value: 'wants',
        label: 'Желает',
        contentLeft: <IconHeart color="inherit" />,
        items: [
            { value: '_fulllabel', label: 'Каждый охотник желает знать, где сидит фазан' },
            { value: '_thePheasant', label: 'Фазан' },
            { value: '_is', label: 'Сидит' },
        ],
    },
    { value: 'toKnow', label: 'Знать', isDisabled: true, contentLeft: <IconEye color="inherit" /> },
    { value: 'where', label: 'Где', color: accent, contentLeft: <IconLocation color="inherit" /> },
    { value: 'is', label: 'Сидит', color: success, contentLeft: <IconAccessibility color="inherit" /> },
    { value: 'thePheasant', label: 'Фазан', color: warning, contentLeft: <IconMagicWand color="inherit" /> },
    {
        value: 'fulllabel',
        label: 'Каждый охотник желает знать, где сидит фазан',
        contentLeft: <IconTrash color="inherit" />,
        color: critical,
    },
];

describe('plasma-web: Dropdown', () => {
    const Dropdown = getComponent('Dropdown');
    const Button = getComponent('Button');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Dropdown items={items}>
                    <Button text="Open" />
                </Dropdown>
            </CypressTestDecorator>,
        );

        cy.get('button').click();
        cy.matchImageSnapshot();
    });

    it('radius and padding', () => {
        mount(
            <CypressTestDecorator>
                <Dropdown
                    items={items}
                    style={{
                        '--plasma-dropdown-padding': '0.25rem',
                        '--plasma-dropdown-border-radius': '1rem',
                        '--plasma-dropdown-item-border-radius': '0.75rem',
                    }}
                >
                    <Button text="Open" />
                </Dropdown>
            </CypressTestDecorator>,
        );

        cy.get('button').click();
        cy.matchImageSnapshot();
    });

    it("block and popup's width", () => {
        mount(
            <CypressTestDecorator>
                <Dropdown items={items} style={{ display: 'block', '--plasma-popup-width': '100%' }}>
                    <Button text="Open" stretch />
                </Dropdown>
            </CypressTestDecorator>,
        );

        cy.get('button').click();
        cy.matchImageSnapshot();
    });
});
