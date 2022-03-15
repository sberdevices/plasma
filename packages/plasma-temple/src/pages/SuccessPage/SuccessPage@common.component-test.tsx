import React from 'react';
import { Button } from '@sberdevices/plasma-ui';

import { startApp } from '../../testHelpers/testRenderHelpers';
import { isSberBoxLike } from '../../utils';

import { SuccessPage, SuccessPageProps } from './SuccessPage';

export function generateWrapper(passedProps?: Partial<SuccessPageProps>) {
    const defaultProps: SuccessPageProps = {
        title: 'Успех',
        subtitle: 'Описание',
    };

    const props = { ...defaultProps, ...passedProps };

    startApp(
        [
            {
                name: 'success',
                component: () => <SuccessPage {...props} />,
            },
        ],
        ({ pushScreen }) => pushScreen('success'),
    );
}

describe('SuccessPage', () => {
    it('render success page', () => {
        generateWrapper();
        cy.matchImageSnapshot();
    });

    it('render success page with buttons', () => {
        generateWrapper({
            buttons: (buttonRef) => (
                <Button ref={buttonRef} view="primary" size="m" stretch data-cy="button">
                    Label
                </Button>
            ),
        });

        if (isSberBoxLike()) {
            cy.get('[data-cy="button"]').focused();
        }
        cy.matchImageSnapshot();
    });
});
