import React from 'react';
import { mount, CypressTestDecorator } from '@sberdevices/plasma-cy-utils';

import { Fade } from '.';

describe('plasma-core: Fade', () => {
    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Fade />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_placement_top', () => {
        mount(
            <CypressTestDecorator>
                <Fade placement="top" />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_placement_bottom', () => {
        mount(
            <CypressTestDecorator>
                <Fade placement="bottom" />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
