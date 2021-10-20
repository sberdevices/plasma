import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

describe('plasma-b2c: UploadAudio', () => {
    const UploadAudio = getComponent('UploadAudio');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <UploadAudio />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
