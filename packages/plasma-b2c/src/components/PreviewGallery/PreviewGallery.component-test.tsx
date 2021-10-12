import React from 'react';
import { mount, CypressTestDecorator, getComponent, PadMe } from '@sberdevices/plasma-cy-utils';

import { IconTrashFilled } from '../../../../plasma-icons';

describe('plasma-b2c: PreviewGallery', () => {
    const PreviewGallery = getComponent('PreviewGallery');

    const base64 = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj';

    const itemBase = {
        id: 1,
        image: `${base64}+N/Q8B8AB4AC/xY2aM8AAAAASUVORK5CYII=`,
    };

    const items = [
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

    it('simple selectable', () => {
        mount(
            <CypressTestDecorator>
                <PreviewGallery
                    items={items}
                    deleteIcon={<IconTrashFilled size="xs" color="inherit" />}
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
                    items={items}
                    deleteIcon={<IconTrashFilled size="xs" color="inherit" />}
                    interactionType="draggable"
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
                <PreviewGallery items={[itemSelected]} deleteIcon={<IconTrashFilled size="xs" color="inherit" />} />
                <PadMe />
                <PreviewGallery items={[itemBase]} deleteIcon={<IconTrashFilled size="xs" color="inherit" />} />
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
                <PreviewGallery items={[itemCaption]} deleteIcon={<IconTrashFilled size="xs" color="inherit" />} />
                <PadMe />
                <PreviewGallery items={[itemBase]} deleteIcon={<IconTrashFilled size="xs" color="inherit" />} />
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
                <PreviewGallery items={[itemError]} deleteIcon={<IconTrashFilled size="xs" color="inherit" />} />
                <PadMe />
                <PreviewGallery items={[itemBase]} deleteIcon={<IconTrashFilled size="xs" color="inherit" />} />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
