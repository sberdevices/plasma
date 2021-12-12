import React from 'react';
import { mount, CypressTestDecorator, getComponent, PadMe } from '@sberdevices/plasma-cy-utils';

describe('plasma-ui: Stepper', () => {
    const Stepper = getComponent('Stepper');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Stepper value={42} />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_pin', () => {
        mount(
            <CypressTestDecorator>
                <Stepper pin="square-square" value={42} />
                <PadMe />
                <Stepper pin="circle-circle" value={42} />
                <PadMe />
                <Stepper pin="square-clear" value={42} />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_min _max', () => {
        mount(
            <CypressTestDecorator>
                <Stepper min={0} value={0} />
                <PadMe />
                <Stepper showRemove min={0} value={0} />
                <PadMe />
                <Stepper max={42} value={42} />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_disabled', () => {
        mount(
            <CypressTestDecorator>
                <Stepper disabled min={0} value={0} />
                <PadMe />
                <Stepper disabled showRemove min={0} value={0} />
                <PadMe />
                <Stepper disabled max={42} value={42} />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('__formatter', () => {
        mount(
            <CypressTestDecorator>
                <Stepper formatter={(val) => `${val}%`} value={42} />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
