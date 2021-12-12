import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

describe('plasma-ui: Slider', () => {
    const Slider = getComponent('Slider');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Slider value={42} min={0} max={100} />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('double', () => {
        mount(
            <CypressTestDecorator>
                <Slider value={[13, 42]} min={0} max={100} />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
