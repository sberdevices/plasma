import React from 'react';
import { mount, CypressTestDecorator, getComponent, PadMe } from '@sberdevices/plasma-cy-utils';

const noop = () => {};

const dragAndDrop = (chainableSelector: Cypress.Chainable, coord: { clientX: number; clientY: number }) => {
    chainableSelector.trigger('mousedown').trigger('mousemove', coord).trigger('mouseup');
};

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

    it('_disabled', () => {
        mount(
            <CypressTestDecorator>
                <Slider disabled value={42} min={0} max={100} />
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

    it('drag and drop with single', () => {
        mount(
            <CypressTestDecorator>
                <Slider onChange={noop} onChangeCommitted={noop} value={50} min={0} max={100} />
            </CypressTestDecorator>,
        );

        dragAndDrop(cy.root(), { clientX: 350, clientY: 15 });

        cy.matchImageSnapshot();
    });

    it('drag and drop without onChange', () => {
        mount(
            <CypressTestDecorator>
                <Slider onChangeCommitted={noop} value={[0, 50]} min={0} max={100} />
                <PadMe />
                <Slider onChangeCommitted={noop} value={50} min={0} max={100} />
            </CypressTestDecorator>,
        );

        dragAndDrop(cy.root().get('div > div + div').first(), { clientX: 50, clientY: 15 });

        dragAndDrop(cy.root().get('div > div + div').last(), { clientX: 350, clientY: 55 });

        cy.matchImageSnapshot();
    });

    it('drag and drop with double', () => {
        mount(
            <CypressTestDecorator>
                <Slider onChange={noop} onChangeCommitted={noop} value={[25, 75]} min={0} max={100} />
            </CypressTestDecorator>,
        );

        dragAndDrop(cy.root().get('div > div + div').first(), { clientX: 50, clientY: 15 });

        dragAndDrop(cy.root().get('div > div + div').last(), { clientX: 450, clientY: 15 });

        cy.matchImageSnapshot();
    });
});
