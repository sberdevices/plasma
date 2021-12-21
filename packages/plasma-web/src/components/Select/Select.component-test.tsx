import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

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

    const ControlledSelect = () => {
        const [value, setValue] = React.useState(null);

        return (
            <Select
                value={value}
                onChange={(v) => setValue(v)}
                items={items}
                placeholder="Попробуй радугу"
                helperText="Skittles"
            />
        );
    };

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Select items={items} placeholder="Попробуй радугу" helperText="Skittles" />
            </CypressTestDecorator>,
        );

        cy.get('button').click();

        cy.matchImageSnapshot();
    });

    it('disabled', () => {
        mount(
            <CypressTestDecorator>
                <Select disabled items={items} placeholder="Попробуй радугу" helperText="Skittles" />
            </CypressTestDecorator>,
        );

        cy.get('button').click({ force: true });

        cy.matchImageSnapshot();
    });

    it('empty', () => {
        mount(
            <CypressTestDecorator>
                <Select items={[]} placeholder="Пустой список" helperText="Empty" />
            </CypressTestDecorator>,
        );

        cy.get('button').click();

        cy.matchImageSnapshot();
    });

    it('multiselect', () => {
        mount(
            <CypressTestDecorator>
                <Select
                    multiselect
                    value={['each', 'wants']}
                    items={items}
                    placeholder="Попробуй радугу"
                    helperText="Skittles"
                />
            </CypressTestDecorator>,
        );

        cy.get('button').click();

        cy.matchImageSnapshot();
    });

    it('item click', () => {
        mount(
            <CypressTestDecorator>
                <ControlledSelect />
            </CypressTestDecorator>,
        );

        cy.get('button').click();
        cy.get('a').contains('Каждый').click({ force: true });
        cy.get('button').click();

        cy.matchImageSnapshot();
    });
});
