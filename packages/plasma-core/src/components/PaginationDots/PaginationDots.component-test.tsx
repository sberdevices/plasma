import React from 'react';
import ReactDom from 'react-dom';
import { mount } from '@cypress/react';
import { CypressTestDecorator, getComponent, PadMe } from '@sberdevices/plasma-cy-utils';

describe('plasma-core: PaginationDots', () => {
    const PaginationDots = getComponent('PaginationDots');
    const PaginationDot = getComponent('PaginationDot');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <PaginationDots>
                    <PaginationDot />
                    <PaginationDot isActive />
                    <PaginationDot />
                </PaginationDots>
                <PadMe />
                <PaginationDots>
                    <PaginationDot isActive />
                    <PaginationDot />
                    <PaginationDot />
                </PaginationDots>
                <PadMe />
                <PaginationDots>
                    <PaginationDot />
                    <PaginationDot />
                    <PaginationDot isActive />
                </PaginationDots>
            </CypressTestDecorator>,
            { ReactDom },
        );

        cy.matchImageSnapshot();
    });
});
