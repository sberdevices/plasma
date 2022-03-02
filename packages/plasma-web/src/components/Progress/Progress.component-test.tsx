import React from 'react';
import { mount, CypressTestDecorator, getComponent, PadMe } from '@sberdevices/plasma-cy-utils';

describe('plasma-web: Progress', () => {
    const Progress = getComponent('Progress');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Progress value={25} status="success" />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('over min and max', () => {
        mount(
            <CypressTestDecorator>
                <Progress value={-25} status="success" />
                <PadMe />
                <Progress value={125} status="success" />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('__displayValue', () => {
        mount(
            <CypressTestDecorator>
                <Progress value={25} displayValue={false} status="success" />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_status', () => {
        mount(
            <CypressTestDecorator>
                <Progress value={25} status="success" />
                <PadMe />
                <Progress value={50} status="warning" />
                <PadMe />
                <Progress value={100} status="error" />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
