/* eslint-disable */
import React, { useState } from 'react';
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

    const openTriggers = ['{uparrow}', '{downarrow}', 'text'];
    openTriggers.forEach((trigger) =>
        it(`should open by ${trigger}`, () => {
            mount(
                <CypressTestDecorator>
                    <ControlledSelect />
                </CypressTestDecorator>,
            );
            cy.get('button').type(trigger);

            cy.matchImageSnapshot();
        }),
    );

    it('should open by Space', () => {
        mount(
            <CypressTestDecorator>
                <ControlledSelect />
            </CypressTestDecorator>,
        );
        cy.get('button').type(' ');

        cy.matchImageSnapshot();
    });

    it('should open by Enter', () => {
        mount(
            <CypressTestDecorator>
                <ControlledSelect />
            </CypressTestDecorator>,
        );
        cy.get('button').type('{enter}');

        cy.matchImageSnapshot();
    });

    it('should change selection on arrow clicks', () => {
        mount(
            <CypressTestDecorator>
                <ControlledSelect />
            </CypressTestDecorator>,
        );
        cy.get('button').type('{enter}{downarrow}', { delay: 100 });

        cy.matchImageSnapshot();
    });

    it('should select item by Enter click', () => {
        const onItemClick = cy.stub();
        mount(
            <CypressTestDecorator>
                <Select onChange={onItemClick} items={items} placeholder="Попробуй радугу" helperText="Skittles" />
            </CypressTestDecorator>,
        );
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.get('button').trigger('keydown', {
            key: 'ArrowDown',
        });
        cy.get('button').trigger('keydown', {
            key: ' ',
        });
        cy.wait(100).then(() => expect(onItemClick).to.be.calledWith(items[2].value));
    });

    it('should select last item by PageDown', () => {
        const onItemClick = cy.stub();
        mount(
            <CypressTestDecorator>
                <Select onChange={onItemClick} items={items} placeholder="Попробуй радугу" helperText="Skittles" />
            </CypressTestDecorator>,
        );
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.get('button').trigger('keydown', {
            key: 'PageDown',
        });
        cy.get('button').trigger('keydown', {
            key: ' ',
        });
        cy.wait(100).then(() => expect(onItemClick).to.be.calledWith(items[items.length - 1].value));
    });

    it('should select last item by End', () => {
        const onItemClick = cy.stub();
        mount(
            <CypressTestDecorator>
                <Select onChange={onItemClick} items={items} placeholder="Попробуй радугу" helperText="Skittles" />
            </CypressTestDecorator>,
        );
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.get('button').trigger('keydown', {
            key: 'End',
        });
        cy.get('button').trigger('keydown', {
            key: ' ',
        });
        cy.wait(100).then(() => expect(onItemClick).to.be.calledWith(items[items.length - 1].value));
    });

    it('should select first item by Home', () => {
        const onItemClick = cy.stub();
        mount(
            <CypressTestDecorator>
                <Select onChange={onItemClick} items={items} placeholder="Попробуй радугу" helperText="Skittles" />
            </CypressTestDecorator>,
        );
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.get('button').trigger('keydown', {
            key: 'ArrowDown',
        });
        cy.get('button').trigger('keydown', {
            key: 'ArrowDown',
        });
        cy.matchImageSnapshot();
        cy.get('button').trigger('keydown', {
            key: 'Home',
        });
        cy.get('button').trigger('keydown', {
            key: ' ',
        });
        cy.wait(100).then(() => expect(onItemClick).to.be.calledWith(items[0].value));
    });

    it('should found item by text', () => {
        const onItemClick = cy.stub();
        mount(
            <CypressTestDecorator>
                <Select onChange={onItemClick} items={items} placeholder="Попробуй радугу" helperText="Skittles" />
            </CypressTestDecorator>,
        );
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.get('button').trigger('keydown', {
            key: 'Г',
        });
        cy.get('button').trigger('keydown', {
            key: ' ',
        });
        cy.wait(100).then(() => expect(onItemClick).to.be.calledWith(items[4].value));
    });

    it('should close without selection by {esc}', () => {
        const onItemClick = cy.stub();
        mount(
            <CypressTestDecorator>
                <Select onChange={onItemClick} items={items} placeholder="Попробуй радугу" helperText="Skittles" />
            </CypressTestDecorator>,
        );
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.get('button').trigger('keydown', {
            key: 'Г',
        });
        cy.get('button').trigger('keydown', {
            key: 'Escape',
        });
        cy.wait(100).then(() => expect(onItemClick.called).to.be.equal(false));
    });

    it('should close on blur', () => {
        mount(
            <CypressTestDecorator>
                <ControlledSelect />
            </CypressTestDecorator>,
        );
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.get('button').trigger('keydown', {
            key: 'Г',
        });
        cy.get('body').click();
        cy.matchImageSnapshot();
    });

    it('should open nested dropdown by space click', () => {
        mount(
            <CypressTestDecorator>
                <ControlledSelect />
            </CypressTestDecorator>,
        );
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.get('button').trigger('keydown', {
            key: 'З',
        });
        cy.get('button').trigger('keydown', {
            key: ' ',
        });
        cy.matchImageSnapshot();
    });

    it('should move over items into nested menu', () => {
        mount(
            <CypressTestDecorator>
                <ControlledSelect />
            </CypressTestDecorator>,
        );
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.get('button').trigger('keydown', {
            key: 'З',
        });
        cy.get('button').trigger('keydown', {
            key: ' ',
        });

        cy.contains('Знать').trigger('keydown', {
            key: 'ArrowDown',
        });
        cy.matchImageSnapshot();
    });

    it('should close only nested menu on Escape', () => {
        mount(
            <CypressTestDecorator>
                <ControlledSelect />
            </CypressTestDecorator>,
        );
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.get('button').trigger('keydown', {
            key: 'З',
        });
        cy.get('button').trigger('keydown', {
            key: ' ',
        });

        cy.contains('Знать').trigger('keydown', {
            key: 'ArrowDown',
        });

        cy.contains('Знать').trigger('keydown', {
            key: 'Escape',
        });
        cy.matchImageSnapshot();
    });

    it('should close all menus and select item on Enter', () => {
        const onItemClick = cy.stub();
        mount(
            <CypressTestDecorator>
                <Select onChange={onItemClick} items={items} placeholder="Попробуй радугу" helperText="Skittles" />
            </CypressTestDecorator>,
        );
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.get('button').trigger('keydown', {
            key: 'З',
        });
        cy.get('button').trigger('keydown', {
            key: ' ',
        });

        cy.contains('Знать').trigger('keydown', {
            key: 'ArrowDown',
        });

        cy.contains('Знать').trigger('keydown', {
            key: 'Enter',
        });
        cy.wait(100).then(() => expect(onItemClick).to.be.calledWith(items[3].items[1].value));
        cy.matchImageSnapshot();
    });

    it('should close all menus on blur', () => {
        mount(
            <CypressTestDecorator>
                <ControlledSelect />
            </CypressTestDecorator>,
        );
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.get('button').trigger('keydown', {
            key: 'Ж',
        });
        cy.get('button').trigger('keydown', {
            key: ' ',
        });

        cy.contains('Желает').trigger('keydown', {
            key: 'ArrowDown',
        });

        cy.get('body').click();
        cy.matchImageSnapshot();
    });

    it('should skip disabled items', () => {
        const onItemClick = cy.stub();
        mount(
            <CypressTestDecorator>
                <Select onChange={onItemClick} items={items} placeholder="Попробуй радугу" helperText="Skittles" />
            </CypressTestDecorator>,
        );
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.get('button').trigger('keydown', {
            key: 'ArrowDown',
        });
        cy.get('button').trigger('keydown', {
            key: 'ArrowUp',
        });
        cy.get('button').trigger('keydown', {
            key: 'ArrowDown',
        });
        cy.get('button').trigger('keydown', {
            key: 'ArrowDown',
        });
        cy.get('button').trigger('keydown', {
            key: 'ArrowDown',
        });
        cy.get('button').trigger('keydown', {
            key: 'ArrowDown',
        });

        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.wait(100).then(() => expect(onItemClick).to.be.calledWith(items[5].value));
    });

    it('should be on first item on fail search', () => {
        const onItemClick = cy.stub();
        mount(
            <CypressTestDecorator>
                <Select onChange={onItemClick} items={items} placeholder="Попробуй радугу" helperText="Skittles" />
            </CypressTestDecorator>,
        );
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.get('button').trigger('keydown', {
            key: 'F',
        });
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.wait(100).then(() => expect(onItemClick).to.be.calledWith(items[0].value));
    });

    it('should move to first item after last', () => {
        const onItemClick = cy.stub();
        mount(
            <CypressTestDecorator>
                <Select onChange={onItemClick} items={items} placeholder="Попробуй радугу" helperText="Skittles" />
            </CypressTestDecorator>,
        );
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.get('button').trigger('keydown', {
            key: 'End',
        });
        cy.get('button').trigger('keydown', {
            key: 'ArrowDown',
        });
        cy.get('button').trigger('keydown', {
            key: 'ArrowDown',
        });
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.wait(100).then(() => expect(onItemClick).to.be.calledWith(items[2].value));
    });

    it('should move to first item on PageUp', () => {
        const onItemClick = cy.stub();
        mount(
            <CypressTestDecorator>
                <Select onChange={onItemClick} items={items} placeholder="Попробуй радугу" helperText="Skittles" />
            </CypressTestDecorator>,
        );
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.get('button').trigger('keydown', {
            key: 'ArrowDown',
        });
        cy.get('button').trigger('keydown', {
            key: 'ArrowDown',
        });
        cy.get('button').trigger('keydown', {
            key: 'PageUp',
        });
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.wait(100).then(() => expect(onItemClick).to.be.calledWith(items[0].value));
    });

    it('should select item on alt + ArrowUp', () => {
        const onItemClick = cy.stub();
        mount(
            <CypressTestDecorator>
                <Select onChange={onItemClick} items={items} placeholder="Попробуй радугу" helperText="Skittles" />
            </CypressTestDecorator>,
        );
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.get('button').trigger('keydown', {
            key: 'ArrowDown',
        });
        cy.get('button').trigger('keydown', {
            key: 'ArrowDown',
        });
        cy.get('button').trigger('keydown', {
            key: 'PageUp',
        });
        cy.get('button').trigger('keydown', {
            key: 'ArrowUp',
            altKey: true,
        });
        cy.wait(100).then(() => expect(onItemClick).to.be.calledWith(items[0].value));
    });

    it('should select more than 1 item and not close', () => {
        mount(
            <CypressTestDecorator>
                <Select multiselect items={items} placeholder="Попробуй радугу" helperText="Skittles" />
            </CypressTestDecorator>,
        );
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.get('button').trigger('keydown', {
            key: 'ArrowDown',
        });
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.get('button').trigger('keydown', {
            key: 'ArrowDown',
        });

        cy.get('button').trigger('keydown', {
            key: 'ArrowDown',
        });
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.matchImageSnapshot();
    });

    it('should select some subitems', () => {
        mount(
            <CypressTestDecorator>
                <Select
                    value={['each', 'wants', '_thePheasant']}
                    multiselect
                    items={items}
                    placeholder="Попробуй радугу"
                    helperText="Skittles"
                />
            </CypressTestDecorator>,
        );
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.get('button').trigger('keydown', {
            key: 'ArrowDown',
        });
        cy.get('button').trigger('keydown', {
            key: 'ArrowDown',
        });
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.matchImageSnapshot();
    });

    it('should select more than 1 item inside submenu and not close', () => {
        mount(
            <CypressTestDecorator>
                <Select multiselect items={items} placeholder="Попробуй радугу" helperText="Skittles" />
            </CypressTestDecorator>,
        );
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.get('button').trigger('keydown', {
            key: 'ArrowDown',
        });
        cy.get('button').trigger('keydown', {
            key: 'ArrowDown',
        });
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });

        cy.get('button').trigger('keydown', {
            key: 'ArrowDown',
        });
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.matchImageSnapshot();
    });
});
