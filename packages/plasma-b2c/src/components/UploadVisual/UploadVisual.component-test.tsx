import React from 'react';
import { mount, CypressTestDecorator, getComponent, PadMe } from '@sberdevices/plasma-cy-utils';

describe('plasma-b2c: UploadVisual', () => {
    const UploadVisual = getComponent('UploadVisual');

    const base64 = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj';

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

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <UploadVisual items={items} />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('__maxCount', () => {
        mount(
            <CypressTestDecorator>
                <UploadVisual maxCount={12} items={items} />
                <PadMe />
                <UploadVisual maxCount={6} items={items} />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
