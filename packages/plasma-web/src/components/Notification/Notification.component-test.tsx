import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { mount, CypressTestDecorator, getComponent, SpaceMe } from '@sberdevices/plasma-cy-utils';

const NoAnimationStyle = createGlobalStyle`
    /* stylelint-disable-next-line selector-max-id, selector-max-universal */
    #plasma-notifications-root * {
        animation: none !important;
    }
`;

describe('plasma-web: Notification', () => {
    const NotificationsProvider = getComponent('NotificationsProvider');
    const addNotification = getComponent('addNotification');
    const closeNotification = getComponent('closeNotification');
    const Button = getComponent('Button');

    it('default', () => {
        mount(
            <CypressTestDecorator>
                <NoAnimationStyle />
                <NotificationsProvider>
                    <Button
                        text="Открыть"
                        onClick={() => {
                            addNotification(
                                {
                                    id: 'test-notification-success',
                                    status: 'success',
                                    title: 'Success!',
                                    children: 'Must be green!',
                                },
                                80000,
                            );
                            addNotification(
                                {
                                    id: 'test-notification-warning',
                                    status: 'warning',
                                    title: 'Warning!',
                                    children: 'Must be yellow!',
                                },
                                80000,
                            );
                            addNotification(
                                {
                                    id: 'test-notification-error',
                                    status: 'error',
                                    title: 'Error!',
                                    children: 'Must be red!',
                                },
                                80000,
                            );
                        }}
                    />
                    <SpaceMe />
                    <Button
                        text="Закрыть"
                        onClick={() => {
                            closeNotification('test-notification-success');
                            closeNotification('test-notification-warning');
                            closeNotification('test-notification-error');
                        }}
                    />
                </NotificationsProvider>
            </CypressTestDecorator>,
        );

        cy.get('button').contains('Открыть').click();
        cy.matchImageSnapshot();
        cy.get('button').contains('Закрыть').click();
    });
});
