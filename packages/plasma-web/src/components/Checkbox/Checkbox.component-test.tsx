import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

describe('plasma-web: Checkbox', () => {
    const Checkbox = getComponent('Checkbox');
    const Link = getComponent('Link');
    const List = getComponent('List');
    const ListItem = getComponent('ListItem');
    const name = 'languages';
    const items = [
        {
            name,
            value: 'natural',
            label: 'Естественные языки',
            disabled: false,
            checked: true,
            indeterminate: false,
            description: 'Языки, на которых говорят люди. Они не были созданы искуственно и развивались естественно.',
        },
        { name, value: 'russian', label: 'Русский', checked: true, disabled: false, parent: 'natural' },
        {
            name,
            value: 'english',
            label: 'Английский',
            checked: true,
            disabled: false,
            description: (
                <>
                    Самый распространенный язык в <Link href="/#">мире</Link>
                </>
            ),
            parent: 'natural',
        },
        { name, value: 'french', label: 'Французский', checked: true, disabled: false, parent: 'natural' },
        {
            name,
            value: 'chinese',
            label: (
                <>
                    Китайский <Link href="/#">язык</Link>
                </>
            ),
            checked: true,
            parent: 'natural',
        },
        {
            name,
            value: 'artificial',
            label: 'Искусственные языки',
            checked: false,
            indeterminate: true,
            disabled: false,
        },
        {
            name,
            value: 'klingon',
            label: 'Клингонский',
            disabled: false,
            checked: false,
            description: 'Язык одной из раз в сериале СтарТрек',
            parent: 'artificial',
        },
        {
            name,
            value: 'elvish',
            label: 'Эльфийский',
            disabled: true,
            checked: true,
            description: 'Искусственный язык из вселенной Властелина колец',
            parent: 'artificial',
        },
        {
            name,
            value: 'dothraki',
            label: 'Дотракийский',
            disabled: true,
            checked: false,
            description: 'Язык, разработанный для реплик дотракийских племен из вселенной Песнь Льда и Огня',
            parent: 'artificial',
        },
    ];

    it('default', () => {
        mount(
            <CypressTestDecorator>
                <List>
                    {items.map((item) => (
                        <ListItem key={item.value} ml={item.parent ? '16x' : undefined} mb="4x">
                            <Checkbox {...item} />
                        </ListItem>
                    ))}
                </List>
            </CypressTestDecorator>,
        );

        cy.get('input[type="checkbox"]').first().focus();
        cy.matchImageSnapshot();
    });
});
