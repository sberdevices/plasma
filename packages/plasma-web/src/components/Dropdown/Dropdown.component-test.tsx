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

    const openTriggers = ['{uparrow}', '{downarrow}', 'text'];
    openTriggers.forEach((trigger) =>
        it(`should open by ${trigger}`, () => {
            mount(
                <CypressTestDecorator>
                    <Dropdown items={items} style={{ display: 'block', '--plasma-popup-width': '100%' }}>
                        <Button text="Open" stretch />
                    </Dropdown>
                </CypressTestDecorator>,
            );
            cy.get('button').type(trigger);

            cy.matchImageSnapshot();
        }),
    );

    it(`should open by Space`, () => {
        mount(
            <CypressTestDecorator>
                <Dropdown items={items} style={{ display: 'block', '--plasma-popup-width': '100%' }}>
                    <Button text="Open" stretch />
                </Dropdown>
            </CypressTestDecorator>,
        );
        cy.get('button').trigger('keydown', {
            key: ' ',
        });

        cy.matchImageSnapshot();
    });

    it(`should open by Enter`, () => {
        mount(
            <CypressTestDecorator>
                <Dropdown items={items} style={{ display: 'block', '--plasma-popup-width': '100%' }}>
                    <Button text="Open" stretch />
                </Dropdown>
            </CypressTestDecorator>,
        );
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });

        cy.matchImageSnapshot();
    });

    it('should change selection on arrow clicks', () => {
        mount(
            <CypressTestDecorator>
                <Dropdown items={items} style={{ display: 'block', '--plasma-popup-width': '100%' }}>
                    <Button text="Open" stretch />
                </Dropdown>
            </CypressTestDecorator>,
        );
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.get('button').type('{downarrow}');
        cy.matchImageSnapshot();
    });

    it('should open on start typing', () => {
        mount(
            <CypressTestDecorator>
                <Dropdown items={items} style={{ display: 'block', '--plasma-popup-width': '100%' }}>
                    <Button text="Open" stretch />
                </Dropdown>
            </CypressTestDecorator>,
        );
        cy.get('button').type('abc');
        cy.matchImageSnapshot();
    });

    it(`should select item by Enter click`, () => {
        const onItemClick = cy.stub();
        mount(
            <CypressTestDecorator>
                <Dropdown
                    onItemClick={onItemClick}
                    items={items}
                    style={{ display: 'block', '--plasma-popup-width': '100%' }}
                >
                    <Button text="Open" stretch />
                </Dropdown>
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
        cy.wait(100).then(() => expect(onItemClick).to.be.calledWith(items[1]));
    });

    it(`should select last item by PageDown`, () => {
        const onItemClick = cy.stub();
        mount(
            <CypressTestDecorator>
                <Dropdown
                    onItemClick={onItemClick}
                    items={items}
                    style={{ display: 'block', '--plasma-popup-width': '100%' }}
                >
                    <Button text="Open" stretch />
                </Dropdown>
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
        cy.wait(100).then(() => expect(onItemClick).to.be.calledWith(items[items.length - 1]));
    });

    it(`should select last item by End`, () => {
        const onItemClick = cy.stub();
        mount(
            <CypressTestDecorator>
                <Dropdown
                    onItemClick={onItemClick}
                    items={items}
                    style={{ display: 'block', '--plasma-popup-width': '100%' }}
                >
                    <Button text="Open" stretch />
                </Dropdown>
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
        cy.wait(100).then(() => expect(onItemClick).to.be.calledWith(items[items.length - 1]));
    });

    it(`should select first item by Home`, () => {
        const onItemClick = cy.stub();
        mount(
            <CypressTestDecorator>
                <Dropdown
                    onItemClick={onItemClick}
                    items={items}
                    style={{ display: 'block', '--plasma-popup-width': '100%' }}
                >
                    <Button text="Open" stretch />
                </Dropdown>
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
        cy.wait(100).then(() => expect(onItemClick).to.be.calledWith(items[0]));
    });

    it(`should found item by text`, () => {
        const onItemClick = cy.stub();
        mount(
            <CypressTestDecorator>
                <Dropdown
                    onItemClick={onItemClick}
                    items={items}
                    style={{ display: 'block', '--plasma-popup-width': '100%' }}
                >
                    <Button text="Open" stretch />
                </Dropdown>
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
        cy.wait(100).then(() => expect(onItemClick).to.be.calledWith(items[4]));
    });

    it(`should close without selection by {esc}`, () => {
        const onItemClick = cy.stub();
        mount(
            <CypressTestDecorator>
                <Dropdown
                    onItemClick={onItemClick}
                    items={items}
                    style={{ display: 'block', '--plasma-popup-width': '100%' }}
                >
                    <Button text="Open" stretch />
                </Dropdown>
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

    it(`should close on blur`, () => {
        mount(
            <CypressTestDecorator>
                <Dropdown items={items} style={{ display: 'block', '--plasma-popup-width': '100%' }}>
                    <Button text="Open" stretch />
                </Dropdown>
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

    it(`should open nested dropdown by space click`, () => {
        mount(
            <CypressTestDecorator>
                <Dropdown items={items} style={{ display: 'block', '--plasma-popup-width': '100%' }}>
                    <Button text="Open" stretch />
                </Dropdown>
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
        cy.matchImageSnapshot();
    });

    it(`should move over items into nested menu`, () => {
        mount(
            <CypressTestDecorator>
                <Dropdown items={items} style={{ display: 'block', '--plasma-popup-width': '100%' }}>
                    <Button text="Open" stretch />
                </Dropdown>
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
        cy.matchImageSnapshot();
    });

    it(`should close only nested menu on Escape`, () => {
        mount(
            <CypressTestDecorator>
                <Dropdown items={items} style={{ display: 'block', '--plasma-popup-width': '100%' }}>
                    <Button text="Open" stretch />
                </Dropdown>
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

        cy.contains('Желает').trigger('keydown', {
            key: 'Escape',
        });
        cy.matchImageSnapshot();
    });

    it(`should close all menus and select item on Enter`, () => {
        const onItemClick = cy.stub();
        mount(
            <CypressTestDecorator>
                <Dropdown
                    items={items}
                    onItemClick={onItemClick}
                    style={{ display: 'block', '--plasma-popup-width': '100%' }}
                >
                    <Button text="Open" stretch />
                </Dropdown>
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

        cy.contains('Желает').trigger('keydown', {
            key: 'Enter',
        });
        cy.wait(100).then(() => expect(onItemClick).to.be.calledWith(items[2].items[1]));
        cy.matchImageSnapshot();
    });

    it(`should close all menus on blur`, () => {
        mount(
            <CypressTestDecorator>
                <Dropdown items={items} style={{ display: 'block', '--plasma-popup-width': '100%' }}>
                    <Button text="Open" stretch />
                </Dropdown>
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
                <Dropdown
                    onItemClick={onItemClick}
                    items={items}
                    style={{ display: 'block', '--plasma-popup-width': '100%' }}
                >
                    <Button text="Open" stretch />
                </Dropdown>
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
        cy.wait(100).then(() => expect(onItemClick).to.be.calledWith(items[5]));
    });

    it('should be on first item on fail search', () => {
        const onItemClick = cy.stub();
        mount(
            <CypressTestDecorator>
                <Dropdown
                    onItemClick={onItemClick}
                    items={items}
                    style={{ display: 'block', '--plasma-popup-width': '100%' }}
                >
                    <Button text="Open" stretch />
                </Dropdown>
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
        cy.wait(100).then(() => expect(onItemClick).to.be.calledWith(items[0]));
    });

    it('should move to first item after last', () => {
        const onItemClick = cy.stub();
        mount(
            <CypressTestDecorator>
                <Dropdown
                    onItemClick={onItemClick}
                    items={items}
                    style={{ display: 'block', '--plasma-popup-width': '100%' }}
                >
                    <Button text="Open" stretch />
                </Dropdown>
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
        cy.wait(100).then(() => expect(onItemClick).to.be.calledWith(items[1]));
    });

    it('should move to first item on PageUp', () => {
        const onItemClick = cy.stub();
        mount(
            <CypressTestDecorator>
                <Dropdown
                    onItemClick={onItemClick}
                    items={items}
                    style={{ display: 'block', '--plasma-popup-width': '100%' }}
                >
                    <Button text="Open" stretch />
                </Dropdown>
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
        cy.wait(100).then(() => expect(onItemClick).to.be.calledWith(items[0]));
    });

    it('should select item on alt + ArrowUp', () => {
        const onItemClick = cy.stub();
        mount(
            <CypressTestDecorator>
                <Dropdown
                    onItemClick={onItemClick}
                    items={items}
                    style={{ display: 'block', '--plasma-popup-width': '100%' }}
                >
                    <Button text="Open" stretch />
                </Dropdown>
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
        cy.wait(100).then(() => expect(onItemClick).to.be.calledWith(items[0]));
    });

    it('should change active item on hover', () => {
        const onItemClick = cy.stub();
        mount(
            <CypressTestDecorator>
                <Dropdown
                    onItemClick={onItemClick}
                    items={items}
                    style={{ display: 'block', '--plasma-popup-width': '100%' }}
                >
                    <Button text="Open" stretch />
                </Dropdown>
            </CypressTestDecorator>,
        );
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.contains('Знать').trigger('mouseover');
        cy.get('button').trigger('keydown', {
            key: 'Enter',
        });
        cy.wait(100).then(() => expect(onItemClick).to.be.calledWith(items[3]));
    });

    it('should select more than 1 item and not close', () => {
        mount(
            <CypressTestDecorator>
                <Dropdown multiselect items={items} style={{ display: 'block', '--plasma-popup-width': '100%' }}>
                    <Button text="Open" stretch />
                </Dropdown>
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

    it('should select more than 1 item inside submenu and not close', () => {
        mount(
            <CypressTestDecorator>
                <Dropdown multiselect items={items} style={{ display: 'block', '--plasma-popup-width': '100%' }}>
                    <Button text="Open" stretch />
                </Dropdown>
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
