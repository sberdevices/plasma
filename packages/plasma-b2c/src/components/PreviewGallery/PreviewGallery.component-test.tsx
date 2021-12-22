import React from 'react';
import { mount, CypressTestDecorator, getComponent, PadMe } from '@sberdevices/plasma-cy-utils';
import { IconTrashFilled } from '@sberdevices/plasma-icons';

import type { PreviewGalleryItemProps } from './PreviewGalleryItemBase';
import { arrayItemRemoving, arrayItemSelecting, arrayItemSwapping } from './utils';

const base64 = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj';

const itemBase: PreviewGalleryItemProps = {
    id: 1,
    image: `${base64}+N/Q8B8AB4AC/xY2aM8AAAAASUVORK5CYII=`,
};

const itemCustom: PreviewGalleryItemProps = {
    id: 1,
    component: <div style={{ width: '150px', height: '150px', background: 'red' }}>Test custom component</div>,
    customClickHandle: () => {},
};

const itemsExamples: PreviewGalleryItemProps[] = [
    {
        id: 1,
        image: `${base64}+N/Q8B8AB4AC/xY2aM8AAAAASUVORK5CYII=`,
        caption: '3:24',
    },
    {
        id: 2,
        image: `${base64}+N/g8B8ABwACvwQSYaIAAAAASUVORK5CYII=`,
        isSelected: true,
    },
    {
        id: 3,
        image: `${base64}aGj4/x8ABoIC/5x793MAAAAASUVORK5CYII=`,
    },
    {
        id: 4,
        image: `${base64}YPjf8B8ABQECf1y8ZwgAAAAASUVORK5CYII=`,
    },
    {
        id: 5,
        image: `${base64}+P+/4T8ACP0Dftzno5UAAAAASUVORK5CYII=`,
    },
    { id: 6, image: '', status: 'error' },
];

describe('plasma-b2c: PreviewGallery', () => {
    const PreviewGallery = getComponent('PreviewGallery');

    it('simple selectable', () => {
        mount(
            <CypressTestDecorator>
                <PreviewGallery
                    items={itemsExamples}
                    actionIcon={<IconTrashFilled size="xs" color="inherit" />}
                    interactionType="selectable"
                />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('simple draggable', () => {
        mount(
            <CypressTestDecorator>
                <PreviewGallery
                    items={itemsExamples}
                    actionIcon={<IconTrashFilled size="xs" color="inherit" />}
                    interactionType="draggable"
                />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('custom item', () => {
        mount(
            <CypressTestDecorator>
                <PreviewGallery
                    items={[itemCustom]}
                    actionIcon={<IconTrashFilled size="xs" color="inherit" />}
                    interactionType="selectable"
                />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_isSelected', () => {
        const itemSelected = {
            id: 1,
            image: `${base64}+N/Q8B8AB4AC/xY2aM8AAAAASUVORK5CYII=`,
            isSelected: true,
        };

        mount(
            <CypressTestDecorator>
                <PreviewGallery items={[itemSelected]} actionIcon={<IconTrashFilled size="xs" color="inherit" />} />
                <PadMe />
                <PreviewGallery items={[itemBase]} actionIcon={<IconTrashFilled size="xs" color="inherit" />} />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_caption', () => {
        const itemCaption = {
            id: 1,
            image: `${base64}+N/Q8B8AB4AC/xY2aM8AAAAASUVORK5CYII=`,
            caption: '42:42',
        };

        mount(
            <CypressTestDecorator>
                <PreviewGallery items={[itemCaption]} actionIcon={<IconTrashFilled size="xs" color="inherit" />} />
                <PadMe />
                <PreviewGallery items={[itemBase]} actionIcon={<IconTrashFilled size="xs" color="inherit" />} />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_status', () => {
        const itemError = {
            id: 1,
            status: 'error',
            image: `${base64}+N/Q8B8AB4AC/xY2aM8AAAAASUVORK5CYII=`,
        };

        mount(
            <CypressTestDecorator>
                <PreviewGallery items={[itemError]} actionIcon={<IconTrashFilled size="xs" color="inherit" />} />
                <PadMe />
                <PreviewGallery items={[itemBase]} actionIcon={<IconTrashFilled size="xs" color="inherit" />} />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});

describe('plasma-b2c: PreviewGallery utils', () => {
    const PreviewGallery = getComponent('PreviewGallery');

    function Demo({
        interactionType,
        itemsExternal,
    }: {
        interactionType: string;
        itemsExternal?: PreviewGalleryItemProps[];
    }) {
        const [items, setItems] = React.useState(itemsExternal);

        const onItemRemove = React.useCallback((id) => {
            setItems((oldItems) => {
                const newItems = arrayItemRemoving(oldItems, id);

                if (newItems.length === 1) {
                    newItems[0].isSelected = true;
                }

                return newItems;
            });
        }, []);

        const onItemSelect = React.useCallback((id) => {
            setItems((oldItems) => {
                const newItems = arrayItemSelecting(oldItems, id);
                return newItems;
            });
        }, []);

        const onItemsSortEnd = React.useCallback(({ oldIndex, newIndex }) => {
            setItems((oldItems) => {
                const newItems = arrayItemSwapping(oldItems, oldIndex, newIndex);
                return newItems;
            });
        }, []);

        return (
            <>
                <PreviewGallery
                    items={items}
                    interactionType={interactionType}
                    onItemAction={onItemRemove}
                    onItemsSortEnd={onItemsSortEnd}
                    onItemClick={onItemSelect}
                    actionIcon={<IconTrashFilled size="xs" color="inherit" />}
                />
                <div style={{ marginTop: '150px', visibility: 'hidden' }}>helper</div>
            </>
        );
    }

    it('empty items list and incorrect id', () => {
        mount(
            <CypressTestDecorator>
                <>
                    <Demo interactionType="selectable" />
                    <Demo itemsExternal={[]} interactionType="selectable" />
                    <Demo itemsExternal={[]} interactionType="draggable" />
                </>
            </CypressTestDecorator>,
        );

        expect(arrayItemSelecting([], 1)).to.deep.eq([]);
        expect(arrayItemRemoving([], 0)).to.deep.eq([]);
        expect(arrayItemSwapping([], 0, 0)).to.deep.eq([]);

        expect(arrayItemRemoving(itemsExamples, 123)).to.deep.eq(itemsExamples);
        expect(arrayItemSelecting(itemsExamples, 123)).to.deep.eq(itemsExamples);

        cy.matchImageSnapshot();
    });

    it('select first item', () => {
        mount(
            <CypressTestDecorator>
                <Demo itemsExternal={itemsExamples} interactionType="selectable" />
            </CypressTestDecorator>,
        );

        cy.get('div > div > div').first().click();

        cy.matchImageSnapshot();
    });

    it('remove last item', () => {
        mount(
            <CypressTestDecorator>
                <Demo itemsExternal={itemsExamples} interactionType="selectable" />
            </CypressTestDecorator>,
        );

        cy.get('div + div + div').last().find('button').click({ force: true });

        cy.matchImageSnapshot();
    });

    it('drag first item to last', () => {
        mount(
            <CypressTestDecorator>
                <Demo itemsExternal={itemsExamples} interactionType="draggable" />
            </CypressTestDecorator>,
        );

        cy.get('div > div > div').first().trigger('mousedown', { waitForAnimations: true });
        cy.get('div > div > div').last().trigger('mousemove', { pageX: 0, pageY: 100 });

        cy.root().click();

        cy.matchImageSnapshot();
    });
});
