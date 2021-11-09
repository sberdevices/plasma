import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

describe('plasma-core: Image', () => {
    const Image = getComponent('Image');

    it('default', () => {
        mount(
            <CypressTestDecorator>
                <Image src="https://plasma.sberdevices.ru/ui/images/320_320_0.jpg" width="320px" height="320px" />
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });

    it('div', () => {
        mount(
            <CypressTestDecorator>
                <Image
                    base="div"
                    src="https://plasma.sberdevices.ru/ui/images/320_320_0.jpg"
                    width="320px"
                    height="320px"
                />
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });
});
