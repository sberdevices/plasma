import React from 'react';
import { Body1, Col } from '@sberdevices/plasma-ui';

import { wrapComponent, startApp, images } from '../../testHelpers/testRenderHelpers';
import { navigate } from '../../../../../cypress/support/commands';

import { ItemPage } from './ItemPage';
import { ItemPageState } from './types';

interface State {
    detail: ItemPageState;
}

let onItemShow: Function;
let onItemFocus: Function;

function beforeTests<T extends object>(partialProps?: T) {
    beforeEach(() => {
        onItemShow = cy.stub();
        onItemFocus = cy.stub();

        startApp<keyof State, State>(
            [
                {
                    name: 'detail',
                    component: wrapComponent(ItemPage, { ...partialProps, onItemShow, onItemFocus }),
                },
            ],
            ({ pushHistory }) => {
                pushHistory('detail', {
                    id: '1',
                    title: 'Cypress Test Item Page',
                    subtitle: 'Subtitle',
                    entities: Array.from({ length: 18 }, (_, i) => ({
                        id: String(i + 1),
                        label: `Entity ${i + 1}`,
                        image: {
                            src: images.image320,
                            ratio: '1 / 1',
                        },
                        position: i + 1,
                    })),
                    entitiesTitle: 'Entites',
                    actionButtonText: 'Click me',
                });
            },
        );
    });
}

describe('ItemPage -- base test', () => {
    beforeTests();

    it('screen rendered', () => {
        cy.get('[data-cy="ItemMainSection-title"]').contains('Cypress Test Item Page');
        cy.get('[data-cy="ItemMainSection-title"]').contains('Subtitle');

        cy.matchImageSnapshot();
    });
});

describe('ItemPage -- call received functions', { scrollBehavior: false }, () => {
    beforeTests();

    it('call `onItemShow` by click on default button', () => {
        cy.focused()
            .click()
            .then(() => {
                expect(onItemShow).to.be.calledWith('1');
            });
    });

    it('call `onItemShow` by Enter type on focused entity card', () => {
        cy.get('[data-cy="item-entity-card"]').first().focus();

        cy.sendNavigateAction([navigate.ENTER]).then(() => {
            expect(onItemShow).to.be.calledWith('1');
        });
    });

    it('call `onItemShow` by click', () => {
        cy.get('[data-cy="item-entity-card"]')
            .first()
            .click()
            .then(() => {
                expect(onItemShow).to.be.calledWith('1');
            });
    });

    it('trigger focus callback', () => {
        cy.get('[data-cy="item-entity-card"]')
            .first()
            .focus()
            .then(() => {
                expect(onItemFocus).to.be.calledWith('1');
            });
    });
});

describe('ItemPage -- render with custom card', () => {
    beforeTests({
        entityComponent: (props) => {
            return (
                <Col type="calc" tabIndex={0} data-cy="custom-card">
                    <Body1>{props.title}</Body1>
                </Col>
            );
        },
    });

    it('render list of custom card', () => {
        cy.get('[data-cy="custom-card"]').first().contains('Entity 1');
        cy.get('[data-cy="custom-card"]').last().contains('Entity 18');

        cy.matchImageSnapshot();
    });
});
