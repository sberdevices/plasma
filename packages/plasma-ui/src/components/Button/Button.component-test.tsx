import React from 'react';
import ReactDom from 'react-dom';
import { mount, CypressTestDecorator } from '@sberdevices/plasma-cy-utils';

import { Button } from './Button';

describe('Button', () => {
    it('renders Button', () => {
        mount(
            <CypressTestDecorator>
                <Button
                    text="Hello Plasma"
                    size="m"
                    view="primary"
                    pin="square-square"
                    scaleOnInteraction
                    outlined
                    focused={false}
                    disabled={false}
                    square={false}
                    stretch={false}
                />
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });
});
