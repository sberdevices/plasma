import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';
import { IconClose } from '@sberdevices/plasma-icons';
import { critical } from '@sberdevices/plasma-tokens-b2c';

describe('plasma-core: Toast', () => {
    const Toast = getComponent('Toast');
    const useToast = getComponent('useToast');
    const ToastProvider = getComponent('ToastProvider');

    it.skip('default', () => {
        mount(
            <CypressTestDecorator>
                <Toast text="Short Text Message Without Action" />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it.skip('__content-left', () => {
        mount(
            <CypressTestDecorator>
                <Toast
                    text="Short Text Message Without Action"
                    contentLeft={<IconClose size="xs" color={critical} />}
                />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it.skip('_role', () => {
        mount(
            <CypressTestDecorator>
                <Toast role="alert" text="Short Text Message Without Action" />
                <Toast role="log" text="Short Text Message Without Action" />
                <Toast role="status" text="Short Text Message Without Action" />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    describe('useToast', () => {
        const text = 'Short Text Message Without Action';
        const textLong =
            'Long Text Message Without Action Long Text Message Without Action Long Text Message Without Action';
        const Button = getComponent('Button');

        const Interactive = ({ text: _text, position, timeout }) => {
            const { showToast } = useToast();

            return <Button id="show" text="show" onClick={() => showToast(_text, position, timeout)} />;
        };

        it.skip('showToast', () => {
            mount(
                <CypressTestDecorator>
                    <ToastProvider>
                        <Interactive text={text} />
                    </ToastProvider>
                </CypressTestDecorator>,
            );

            cy.get('#show').click();

            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(300);
            cy.matchImageSnapshot();
        });

        it.skip('_position', () => {
            mount(
                <CypressTestDecorator>
                    <ToastProvider>
                        <Interactive text={text} position="top" />
                    </ToastProvider>
                </CypressTestDecorator>,
            );

            cy.get('#show').click();

            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(300);
            cy.matchImageSnapshot();
        });

        it.skip('dumm', () => {
            mount(
                <CypressTestDecorator>
                    <ToastProvider>
                        <Interactive />
                    </ToastProvider>
                </CypressTestDecorator>,
            );

            cy.get('#show').click();

            cy.matchImageSnapshot();
        });

        it.skip('timeout', () => {
            mount(
                <CypressTestDecorator>
                    <ToastProvider>
                        <Interactive text={text} timeout={0} />
                    </ToastProvider>
                </CypressTestDecorator>,
            );

            cy.get('#show').click();

            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(600);
            cy.matchImageSnapshot();
        });

        it('two lines', () => {
            mount(
                <CypressTestDecorator>
                    <ToastProvider>
                        <Interactive text={textLong} />
                    </ToastProvider>
                </CypressTestDecorator>,
            );

            cy.get('#show').click();

            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(300);
            cy.matchImageSnapshot();
        });
    });
});
