import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

describe('plasma-web: Tooltip', () => {
    const Tooltip = getComponent('Tooltip');
    const Button = getComponent('Button');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Tooltip text="Высокое качество воспроизведения" visible placement="right">
                    <Button text="hello" />
                </Tooltip>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
