import React from 'react';
import ReactDom from 'react-dom';
import { mount } from '@cypress/react';
import { CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

describe('plasma-web: Select', () => {
    const Select = getComponent('Select');

    const items = [
        { value: 'each', label: 'Каждый' },
        { value: 'hunter', label: 'Охотник', isDisabled: true },
        { value: 'wants', label: 'Желает' },
        {
            value: 'toKnow',
            label: 'Знать',
            items: [
                { value: '_fullText', label: 'Каждый охотник желает знать, где сидит фазан' },
                { value: '_thePheasant', label: 'Фазан' },
                { value: '_is', label: 'Сидит' },
            ],
        },
        { value: 'where', label: 'Где' },
        { value: 'is', label: 'Сидит' },
        { value: 'thePheasant', label: 'Фазан' },
        { value: 'fullText', label: 'Каждый охотник желает знать, где сидит фазан' },
    ];

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Select items={items} placeholder="Попробуй радугу" helperText="Skittles" />
            </CypressTestDecorator>,
            { ReactDom },
        );

        cy.get('button').click();

        cy.matchImageSnapshot();
    });
});
