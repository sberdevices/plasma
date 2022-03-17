import React from 'react';
import { Button, detectDevice, Image } from '@sberdevices/plasma-ui';

import { startApp, stubImage, images } from '../../testHelpers/testRenderHelpers';

import { StateLayout } from './StateLayout';
import { StateLayoutCommonProps } from './types';

function initStateLayoutTest(props?: Partial<React.PropsWithChildren<StateLayoutCommonProps>>) {
    return startApp([
        {
            name: 'state',
            component: () => (
                <StateLayout
                    title="StateLayout Component Test"
                    button={<Button view="primary" text="Button" data-cy="test-control" />}
                    background={images.imageBg}
                    backgroundFit="cover"
                    image={images.image320}
                    {...props}
                >
                    {props?.children}
                </StateLayout>
            ),
        },
    ]);
}

describe('StateLayout', () => {
    beforeEach(() => {
        stubImage('https://plasma.sberdevices.ru/ui-storybook/images/320_320_0.jpg', 'images/320_320_0.jpg');
        stubImage('https://plasma.sberdevices.ru/temple-storybook/images/parrot.png', 'images/parrot.png');
    });

    afterEach(() => {
        cy.matchImageSnapshot();
    });

    it('render', () => {
        initStateLayoutTest().then(() => {
            cy.get('[data-cy="state-layout-title"]').should('contain.text', 'StateLayout Component Test');
            cy.get('[data-cy="test-control"]').should('be.enabled').should('be.visible');
            cy.get('[data-cy="state-layout-image-wrapper"]').children().should('have.length', 1);
        });
    });

    it('render with children', () => {
        const imageWidth = () => {
            switch (detectDevice()) {
                case 'sberBox':
                    return '656px';
                case 'sberPortal':
                    return '486px';
                default:
                    return '375px';
            }
        };
        initStateLayoutTest({
            children: (
                <div style={{ marginLeft: 'auto', width: imageWidth() }}>
                    <Image base="div" src={images.image320} ratio="1 / 1" data-cy="test-image" />
                </div>
            ),
        }).then(() => {
            cy.get('[data-cy="test-image"]').should('be.visible');
        });
    });

    it('render with broken image', () => {
        initStateLayoutTest({
            image: 'invalid url',
        }).then(() => {
            cy.get('[data-cy="state-layout-image-wrapper"]').should('exist');
        });
    });

    it('render with custom ratio', () => {
        initStateLayoutTest({
            image: { src: images.image320, customRatio: '100' },
        }).then(() => {
            cy.get('[data-cy="state-layout-image-wrapper"]').should('exist');
        });
    });

    it('render without background mask', () => {
        initStateLayoutTest({
            image: { src: images.image320, customRatio: '100' },
            backgroundMask: false,
        }).then(() => {
            cy.get('[data-cy="state-layout-image-wrapper"]').should('exist');
        });
    });
});
